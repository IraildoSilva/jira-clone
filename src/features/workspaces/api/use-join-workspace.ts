import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

import { client } from '@/lib/rpc'
import { toast } from 'sonner'

type Route = (typeof client.api.workspaces)[':workspaceId']['join']['$post']

type ResponseType = InferResponseType<Route, 200>
type RequestType = InferRequestType<Route>

export function useJoinWorkspace() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.workspaces[':workspaceId']['join'][
        '$post'
      ]({
        param,
        json,
      })

      if (!response.ok) {
        throw new Error('Failed to join workspace')
      }

      return await response.json()
    },
    onSuccess: ({ data }) => {
      toast.success('Joined workspace')
      queryClient.invalidateQueries({ queryKey: ['workspaces'] })
      queryClient.invalidateQueries({ queryKey: ['workspace', data.$id] })
    },
    onError: () => {
      toast.error('Failed to join workspace')
    },
  })

  return mutation
}
