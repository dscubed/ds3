import Section from '@/app/components/Section'
import { teams } from '@/app/components/committee/memberData'
import MemberList from '@/app/components/committee/MemberList'

export default function TeamsSection () {
  return (
    <Section>
      <h2 className="text-2xl">Officers</h2>
      <MemberList teams={teams}/>
    </Section>
  )
}