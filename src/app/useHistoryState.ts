import { useCallback, useState } from 'react'

type HistoryState<T> = {
  past: T[]
  present: T
  future: T[]
}

type SetStateAction<T> = T | ((current: T) => T)

export function useHistoryState<T>(initial: T) {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initial,
    future: [],
  })

  const setState = useCallback((action: SetStateAction<T>) => {
    setHistory((current) => {
      const nextPresent =
        typeof action === 'function'
          ? (action as (current: T) => T)(current.present)
          : action

      if (nextPresent === current.present) {
        return current
      }

      return {
        past: [...current.past, current.present],
        present: nextPresent,
        future: [],
      }
    })
  }, [])

  const undo = useCallback(() => {
    setHistory((current) => {
      if (current.past.length === 0) {
        return current
      }

      const previous = current.past[current.past.length - 1]
      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future],
      }
    })
  }, [])

  const redo = useCallback(() => {
    setHistory((current) => {
      if (current.future.length === 0) {
        return current
      }

      const [next, ...rest] = current.future
      return {
        past: [...current.past, current.present],
        present: next,
        future: rest,
      }
    })
  }, [])

  return {
    state: history.present,
    setState,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  }
}
