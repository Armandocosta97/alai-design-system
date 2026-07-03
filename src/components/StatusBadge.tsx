import type { ComponentManifest } from '../config/componentManifest'

type StatusBadgeProps = {
  status: ComponentManifest['status']
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {status}
    </span>
  )
}

export default StatusBadge
