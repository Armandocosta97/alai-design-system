type EmptyStateProps = {
  title: string
  description: string
}

function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <div className="empty-state__panel">
        <p className="empty-state__eyebrow">Registry</p>
        <h2 className="empty-state__title">{title}</h2>
        <p className="empty-state__description">{description}</p>
      </div>
    </section>
  )
}

export default EmptyState
