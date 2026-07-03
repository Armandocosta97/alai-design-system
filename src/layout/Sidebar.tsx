import { NavLink } from 'react-router-dom'
import { navigationItems } from '../config/navigation'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand" aria-label="ALai Design System">
        <span className="sidebar__brand-mark">A</span>
        <div className="sidebar__brand-copy">
          <span className="sidebar__brand-name">ALai</span>
          <span className="sidebar__brand-subtitle">Design System</span>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        {navigationItems.map((item) => (
          <NavLink
            key={item.label}
            className={({ isActive }) =>
              isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
            }
            to={item.path}
            end={item.path === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
