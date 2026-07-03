import { Outlet, useLocation } from 'react-router-dom'
import { navigationItems } from '../config/navigation'
import MainContent from './MainContent'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

function AppLayout() {
  const location = useLocation()
  const activeItem = navigationItems.find((item) => item.path === location.pathname)
  const title = activeItem?.label ?? 'Overview'

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__body">
        <TopBar title={title} />
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  )
}

export default AppLayout
