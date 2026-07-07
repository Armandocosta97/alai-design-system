import {
  createContext,
  useContext,
  useEffect,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react'
import { createInitialProject, type Project } from '../config/project'
import { useHistoryState } from './useHistoryState'

type ProjectContextValue = {
  project: Project
  setProject: Dispatch<SetStateAction<Project>>
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: PropsWithChildren) {
  const { state: project, setState: setProject, undo, redo, canUndo, canRedo } =
    useHistoryState<Project>(createInitialProject())

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isModifierPressed = event.metaKey || event.ctrlKey
      if (!isModifierPressed || event.key.toLowerCase() !== 'z') {
        return
      }

      event.preventDefault()

      if (event.shiftKey) {
        redo()
      } else {
        undo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  return (
    <ProjectContext.Provider value={{ project, setProject, undo, redo, canUndo, canRedo }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error('useProject must be used within ProjectProvider')
  }

  return context
}
