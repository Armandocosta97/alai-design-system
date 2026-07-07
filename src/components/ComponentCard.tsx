import { Link } from 'react-router-dom'
import type { ComponentManifest } from '../config/componentManifest'
import ComponentThumbnail from './ComponentThumbnail'
import StatusBadge from './StatusBadge'
import Tag from './Tag'

type ComponentCardProps = {
  item: ComponentManifest
}

function ComponentCard({ item }: ComponentCardProps) {
  return (
    <article className="component-card">
      <ComponentThumbnail manifest={item} />

      <div className="component-card__header">
        <div>
          <p className="component-card__eyebrow">
            {item.category} · v{item.version}
          </p>
          <h3 className="component-card__title">{item.name}</h3>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <p className="component-card__description">{item.description}</p>

      <div className="component-card__meta">
        {item.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
        {item.industries.map((industry) => (
          <Tag key={industry} label={industry} />
        ))}
      </div>

      <Link className="builder-panel__button" to={`/playground/${item.id}`}>
        Open Playground
      </Link>
    </article>
  )
}

export default ComponentCard
