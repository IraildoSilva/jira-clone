import { useQueryState, parseAsString } from 'nuqs'

export function useEditTaskModal() {
  const [taskId, setTaskId] = useQueryState(
    'edit-task',
    parseAsString,
  )

  function open(id: string) {
    setTaskId(id)
  }

  function close() {
    setTaskId(null)
  }

  return {
    taskId,
    open,
    close,
    setTaskId,
  }
}
