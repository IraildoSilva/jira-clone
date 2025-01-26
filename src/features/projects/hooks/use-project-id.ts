import { useParams } from 'next/navigation'

export function useProjectId() {
  const { projectId } = useParams()

  return projectId as string
}
