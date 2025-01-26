import { redirect } from 'next/navigation'

import { ProjectIdClient } from './client'

import { getCurrent } from '@/features/auth/queries'

export default async function ProjectIdPage() {
  const user = getCurrent()
  if (!user) redirect('/sign-in')

  return <ProjectIdClient />
}
