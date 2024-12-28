import { createSessionClient } from '@/lib/apprwrite'

export async function getCurrent() {
  try {
    const { account } = await createSessionClient()
 
    return await account.get()
  } catch {
    return null
  }
}
