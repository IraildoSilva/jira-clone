import { useQueryState, parseAsBoolean } from 'nuqs'

export function useCreateTaskModal() {
  const [isOpen, setIsOpen] = useQueryState(
    'create-task',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }) //set default url state to false and clear that when is default.
  )

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  }
}
