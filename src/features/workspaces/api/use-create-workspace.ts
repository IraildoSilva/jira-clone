import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { toast } from "sonner"

type Route = typeof client.api.workspaces.$post

type ResponseType = InferResponseType<Route>
type RequestType = InferRequestType<Route>

export function useCreateWorkspace() {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspaces.$post({ json })

      if (!response.ok) {
        throw new Error("Failed to create workspace")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success("Workspace created")
      queryClient.invalidateQueries({ queryKey: ["workspaces"] })
    },
    onError: () => {
      toast.error("Failed to create workspace")
    },
  })

  return mutation
}
