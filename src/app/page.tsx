// Server Component: fetch data and pass to client wrapper
import type { Weapon } from '@/components/ui/blocks/WeaponBox'
import { createClient } from '@/app/utils/supabase/server'
import LandingClient from './LandingClient'

export default async function Page() {
  const supabase = await createClient()

  // Fetch weapons data; data can be null, so coalesce to empty array
  const { data, error } = await supabase
    .from<'weapons',Weapon>('weapons')
    .select('*')

  const weapons: Weapon[] = data ?? []

  return (
    <LandingClient initialWeapons={weapons} />
  )
}