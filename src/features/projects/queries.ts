import { createSessionClient } from '@/lib/apprwrite'
import { getMember } from '../members/utils'
import { DATABASE_ID, PROJECTS_ID } from '@/config'
import { Project } from './types'

interface GetProjectProps {
  projectId: string
}

export async function getProject({ projectId }: GetProjectProps) {
  try {
    const { account, databases } = await createSessionClient()

    const user = await account.get()

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    )

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    })

    if (!member) {
      return null
    }

    return project
  } catch {
    return null
  }
}
