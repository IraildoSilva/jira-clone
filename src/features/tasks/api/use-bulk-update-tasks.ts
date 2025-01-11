import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

import { client } from '@/lib/rpc'
import { toast } from 'sonner'

type Route = (typeof client.api.tasks)['bulk-update']['$post']

type ResponseType = InferResponseType<Route, 200>
type RequestType = InferRequestType<Route>

export function useBulkUpdateTasks() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks['bulk-update']['$post']({
        json,
      })

      if (!response.ok) {
        throw new Error('Failed to update tasks')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Tasks updated')

      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: () => {
      toast.error('Failed to update tasks')
    },
  })

  return mutation
}
