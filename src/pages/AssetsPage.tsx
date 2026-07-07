import EmptyState from '../components/EmptyState'
import { useProject } from '../app/ProjectContext'

const fakeAssetTemplates = [
  { name: 'Logo.svg', type: 'image/svg+xml', url: '/assets/logo.svg', size: 18432 },
  { name: 'Hero.jpg', type: 'image/jpeg', url: '/assets/hero.jpg', size: 482331 },
  { name: 'Background.jpg', type: 'image/jpeg', url: '/assets/background.jpg', size: 763210 },
]

function AssetsPage() {
  const { project, setProject } = useProject()

  function handleUploadAsset() {
    const createdAt = new Date().toISOString()

    setProject((currentProject) => ({
      ...currentProject,
      assets: [
        ...currentProject.assets,
        ...fakeAssetTemplates.map((asset) => ({
          ...asset,
          id: `asset-${crypto.randomUUID()}`,
          createdAt,
        })),
      ],
    }))
  }

  return (
    <section className="assets-page">
      <div className="assets-page__header">
        <div>
          <p className="assets-page__eyebrow">Project Assets</p>
          <h2 className="assets-page__title">Asset Manager</h2>
          <p className="assets-page__description">
            Assets are first-class project objects and will later power image-based components and exports.
          </p>
        </div>
        <button className="builder-panel__button" type="button" onClick={handleUploadAsset}>
          Upload Asset
        </button>
      </div>

      {project.assets.length === 0 ? (
        <EmptyState
          title="No assets available yet."
          description="Upload Asset will create local placeholder assets for the current project."
        />
      ) : (
        <div className="assets-grid">
          {project.assets.map((asset) => (
            <article key={asset.id} className="asset-card">
              <p className="asset-card__type">{asset.type}</p>
              <h3 className="asset-card__name">{asset.name}</h3>
              <p className="asset-card__meta">URL: {asset.url}</p>
              <p className="asset-card__meta">Size: {asset.size} bytes</p>
              <p className="asset-card__meta">Created: {new Date(asset.createdAt).toLocaleString()}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default AssetsPage
