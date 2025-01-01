import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { Query } from 'node-appwrite'
import { Hono } from 'hono'

import { createAdminClient } from '@/lib/apprwrite'
import { sessionMiddleware } from '@/lib/session-middleware'
import { DATABASE_ID, MEMBERS_ID } from '@/config'

import { getMember } from '../utils'

const app = new Hono().get(
  '/',
  sessionMiddleware,
  zValidator('query', z.object({ workspaceId: z.string() })),
  async (c) => {
    const { users } = await createAdminClient()
    const databases = c.get('databases')
    const user = c.get('user')
    const { workspaceId } = c.req.valid('query')

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    })

    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal('workspaceId', workspaceId),
    ])

    const populatedMembers = await Promise.all(
      members.documents.map(async (member) => {
        const user = await users.get(member.userId)

        return {
          ...member,
          name: user.name,
          email: user.email,
        }
      })
    )

    return c.json({ data: { ...members, documents: populatedMembers } })
  }
)

export default app
