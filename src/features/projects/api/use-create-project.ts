import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

import { client } from '@/lib/rpc'
import { toast } from 'sonner'

type Route = typeof client.api.projects.$post

type ResponseType = InferResponseType<Route, 200>
type RequestType = InferRequestType<Route>

export function useCreateProject() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.projects.$post({ form })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Project created')
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: () => {
      toast.error('Failed to create project')
    },
  })

  return mutation
}
