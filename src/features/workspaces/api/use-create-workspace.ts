import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"

type Route = typeof client.api.workspaces.$post

type ResponseType = InferResponseType<Route>
type RequestType = InferRequestType<Route>

export function useCreateWorkspace() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspaces.$post({ json })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
  })

  return mutation
}
