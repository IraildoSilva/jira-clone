import { redirect } from 'next/navigation'

import { getCurrent } from '@/features/auth/actions'

export default async function WorkspaceIdPage() {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  return <div>WorkspaceId</div>
}
