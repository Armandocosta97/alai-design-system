type CategoryHeaderProps = {
  title: string
  count: number
}

function CategoryHeader({ title, count }: CategoryHeaderProps) {
  const label = count === 1 ? 'component' : 'components'

  return (
    <header className="category-header">
      <div>
        <p className="category-header__eyebrow">Registry</p>
        <h2 className="category-header__title">{title}</h2>
      </div>
      <p className="category-header__count">
        {count} {label}
      </p>
    </header>
  )
}

export default CategoryHeader
