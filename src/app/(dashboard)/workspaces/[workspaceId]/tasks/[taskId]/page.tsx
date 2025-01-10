interface TaskIdPageProps {
	params: {
		taskId: string
	}
}

export default function TaskIdPage({ params }: TaskIdPageProps) {
	return (
		<div>
			Task ID Page: {params.taskId}
		</div>
	)
}