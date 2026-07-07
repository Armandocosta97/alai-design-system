import { RouterProvider } from 'react-router-dom'
import { ProjectProvider } from './ProjectContext'
import { router } from './routes'

function App() {
  return (
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  )
}

export default App
