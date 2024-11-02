import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation"

type Route = typeof client.api.auth.register.$post

type ResponseType = InferResponseType<Route>
type RequestType = InferRequestType<Route>

export function useRegister() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json })

      return await response.json()
    },
    onSuccess: () => {
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] })
    },
  })

  return mutation
}
