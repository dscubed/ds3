import Section from '@/app/components/Section'
import { directors } from '@/app/components/committee/memberData'
import MemberCard from '@/app/components/committee/MemberCard'

export default function DirectorSection () {
  return (
    <Section>
      <h2 className="text-2xl">Directors</h2>
      <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 xs:grid-cols-1">
        {directors.map((profile, index) => (
          <MemberCard {...profile} key={index} />)
        )}
      </div>
    </Section>
  )
}