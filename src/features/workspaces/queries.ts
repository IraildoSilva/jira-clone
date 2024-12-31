'use server'

import { Query } from 'node-appwrite'
import { getMember } from '@/features/members/utils'
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from '@/config'
import { Workspace } from './types'
import { createSessionClient } from '@/lib/apprwrite'

export async function getWorkspaces() {
  try {
    const { account, databases } = await createSessionClient()
    const user = await account.get()

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal('userId', user.$id),
    ])

    if (members.total === 0) {
      return { documents: [], total: 0 }
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId)

    const workspace = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc('$createdAt'), Query.contains('$id', workspaceIds)]
    )

    return workspace
  } catch {
    return { documents: [], total: 0 }
  }
}

interface GetWorkspaceProps {
  workspaceId: string
}

export async function getWorkspace({ workspaceId }: GetWorkspaceProps) {
  try {
    const { account, databases } = await createSessionClient()

    const user = await account.get()

    const member = await getMember({ databases, userId: user.$id, workspaceId })

    if (!member) {
      return null
    }

    const workspaces = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    )

    return workspaces
  } catch {
    return null
  }
}

interface GetWorkspaceInfoProps {
  workspaceId: string
}

export async function getWorkspaceInfo({ workspaceId }: GetWorkspaceInfoProps) {
  try {
    const { databases } = await createSessionClient()

    const workspace = await databases.getDocument<Workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    )

    return {
      name: workspace.name
    }
  } catch {
    return null
  }
}
