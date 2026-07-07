// Eagerly loads every file under the component library as raw text, keyed by
// its project-root-relative path (e.g. "/src/library/headers/Header01/README.md").
// A brand new component just needs to live under src/library/** — nothing here
// or in any consumer (Export Engine, Playground) ever needs to change to pick it up.
export const librarySources = import.meta.glob('/src/library/**/*', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function getLibrarySource(sourceFolder: string, fileName: string): string | undefined {
  return librarySources[`/${sourceFolder}/${fileName}`]
}
