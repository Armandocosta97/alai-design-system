type PagePlaceholderProps = {
  title: string
  description: string
}

function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="page-placeholder">
      <div className="page-placeholder__content">
        <p className="page-placeholder__eyebrow">Design System</p>
        <h2 className="page-placeholder__title">{title}</h2>
        <p className="page-placeholder__description">{description}</p>
      </div>
    </section>
  )
}

export default PagePlaceholder
