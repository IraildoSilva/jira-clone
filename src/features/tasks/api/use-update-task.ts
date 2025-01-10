import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

import { client } from '@/lib/rpc'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

type Route = (typeof client.api.tasks)[':taskId']['$patch']

type ResponseType = InferResponseType<Route, 200>
type RequestType = InferRequestType<Route>

export function useUpdateTask() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.tasks[':taskId']['$patch']({
        json,
        param,
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Task updated')

      router.refresh()
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['task', data.$id] })
    },
    onError: () => {
      toast.error('Failed to update task')
    },
  })

  return mutation
}
