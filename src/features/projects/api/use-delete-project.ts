import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

import { client } from '@/lib/rpc'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Route = (typeof client.api.projects)[':projectId']['$delete']

type ResponseType = InferResponseType<Route, 200>
type RequestType = InferRequestType<Route>

export function useDeleteProject() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[':projectId']['$delete']({
        param,
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Project deleted')
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects', data.$id] })
    },
    onError: () => {
      toast.error('Failed to delete project')
    },
  })

  return mutation
}
