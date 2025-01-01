import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

import { client } from '@/lib/rpc'
import { toast } from 'sonner'

type Route = (typeof client.api.members)[':memberId']['$patch']

type ResponseType = InferResponseType<Route, 200>
type RequestType = InferRequestType<Route>

export function useUpdateMember() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.members[':memberId']['$patch']({
        param,
        json,
      })

      if (!response.ok) {
        throw new Error('Failed to update member')
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success('Member updated')
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
    onError: () => {
      toast.error('Failed to update member')
    },
  })

  return mutation
}
