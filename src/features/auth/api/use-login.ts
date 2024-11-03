import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Route = typeof client.api.auth.login.$post

type ResponseType = InferResponseType<Route>
type RequestType = InferRequestType<Route>

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json })

      if (!response.ok) {
        throw new Error("Failed to log in")
      }

      return await response.json()
    },
    onSuccess: () => {
      toast.success("Logged in")
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["current"] })
    },
    onError: () => {
      toast.error("Filed to log in")
    },
  })

  return mutation
}
