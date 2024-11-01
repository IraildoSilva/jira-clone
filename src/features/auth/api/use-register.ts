import { useMutation } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'

import { client } from '@/lib/rpc'

type Route = typeof client.api.auth.register.$post

type ResponseType = InferResponseType<Route>
type RequestType = InferRequestType<Route>

export function useRegister() {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json })

      return await response.json()
    },
  })

  return mutation
}
