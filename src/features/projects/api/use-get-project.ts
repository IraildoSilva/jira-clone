import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'

interface UseGetProjectProps {
  projectId: string
}

export function useGetProject({ projectId }: UseGetProjectProps) {
  const query = useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => {
      const response = await client.api.projects[':projectId'].$get({
        param: { projectId },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch project')
      }

      const { data } = await response.json()

      return data
    },
  })

  return query
}
