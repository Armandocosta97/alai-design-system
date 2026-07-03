import CategoryHeader from '../components/CategoryHeader'
import ComponentCard from '../components/ComponentCard'
import EmptyState from '../components/EmptyState'
import { componentRegistry } from '../config/componentRegistry'

type CategoryPageProps = {
  title: string
  description: string
  category: string
}

function CategoryPage({ title, description, category }: CategoryPageProps) {
  const normalizedCategory = category.toLowerCase()
  const components = componentRegistry.filter(
    (item) => item.category.toLowerCase() === normalizedCategory,
  )

  if (components.length === 0) {
    return (
      <EmptyState
        title="No components available yet."
        description={description}
      />
    )
  }

  return (
    <section className="registry-page">
      <CategoryHeader title={title} count={components.length} />
      <div className="registry-grid">
        {components.map((item) => (
          <ComponentCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

export default CategoryPage
