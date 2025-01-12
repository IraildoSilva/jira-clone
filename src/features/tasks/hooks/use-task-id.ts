import { useParams } from "next/navigation";

export function useTaskId() {
	const { taskId } = useParams()

	return taskId as string
}