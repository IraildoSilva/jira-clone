import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

import { client } from '@/lib/rpc'
import { toast } from 'sonner'

type Route = (typeof client.api.projects)[':projectId']['$patch']

type ResponseType = InferResponseType<Route, 200>
type RequestType = InferRequestType<Route>

export function useUpdateProject() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await client.api.projects[':projectId']['$patch']({
        form,
        param,
      })

      if (!response.ok) {
        throw new Error('Failed to update project')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Project updated')
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['projects', data.$id] })
    },
    onError: () => {
      toast.error('Failed to update project')
    },
  })

  return mutation
}
