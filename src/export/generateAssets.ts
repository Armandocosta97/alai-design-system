import type { Project, ProjectAsset } from '../config/project'
import type { VirtualProjectFile } from './types'
import { getAllUsedAssets } from './assetUsage'

// Only plain-text data URIs (e.g. inline SVG) can be written safely through this
// pipeline's UTF-8 file writer. Base64-encoded raster payloads would need a
// binary-aware ZIP write step, so those keep their original URL reference instead
// of a local copy.
const TEXT_DATA_URI_PATTERN = /^data:([^;,]+),(.*)$/s

function extensionForMimeType(mimeType: string): string {
  return mimeType === 'image/svg+xml' ? 'svg' : 'txt'
}

function toAssetFileName(asset: ProjectAsset, mimeType: string): string {
  const base = asset.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9-_]+/g, '-') || asset.id
  return `${base}.${extensionForMimeType(mimeType)}`
}

function generateProjectTypesFile(): VirtualProjectFile {
  const content =
    'export type ProjectAsset = {\n  id: string\n  name: string\n  type: string\n  url: string\n  size: number\n  createdAt: string\n}\n'

  return { path: 'src/config/project.ts', content }
}

function generateAssetsIndexFile(
  usedAssets: ProjectAsset[],
  localFileNameByAssetId: Map<string, string>,
): VirtualProjectFile {
  const importLines: string[] = []
  const entries = usedAssets.map((asset, index) => {
    const localFileName = localFileNameByAssetId.get(asset.id)

    if (!localFileName) {
      return `  '${asset.id}': ${JSON.stringify(asset)},`
    }

    const importName = `asset${index}`
    importLines.push(`import ${importName} from './${localFileName}'`)

    return `  '${asset.id}': {\n    id: '${asset.id}',\n    name: ${JSON.stringify(asset.name)},\n    type: ${JSON.stringify(asset.type)},\n    url: ${importName},\n    size: ${asset.size},\n    createdAt: ${JSON.stringify(asset.createdAt)},\n  },`
  })

  const content = `import type { ProjectAsset } from '../config/project'\n${
    importLines.length > 0 ? `${importLines.join('\n')}\n` : ''
  }\nexport const assetsById: Record<string, ProjectAsset> = {\n${entries.join('\n')}\n}\n`

  return { path: 'src/assets/index.ts', content }
}

export function generateAssets(project: Project): VirtualProjectFile[] {
  const usedAssets = getAllUsedAssets(project)
  const localFileNameByAssetId = new Map<string, string>()
  const copiedFiles: VirtualProjectFile[] = []

  usedAssets.forEach((asset) => {
    const match = asset.url.match(TEXT_DATA_URI_PATTERN)

    if (!match) {
      return
    }

    const [, mimeType, payload] = match
    const fileName = toAssetFileName(asset, mimeType)

    copiedFiles.push({ path: `src/assets/${fileName}`, content: decodeURIComponent(payload) })
    localFileNameByAssetId.set(asset.id, fileName)
  })

  return [
    generateProjectTypesFile(),
    generateAssetsIndexFile(usedAssets, localFileNameByAssetId),
    ...copiedFiles,
  ]
}
