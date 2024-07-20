
import Section from '@/app/components/Section'
import { past } from '@/app/components/sponsors/sponsorData'
import SponsorCardSmall from './SponsorCardSmall'

export default function PartnerSection () {
  return (
    <Section>
      <h3 className="text-2xl text-center">Past Sponsors</h3>
      <div className="grid grid-cols-4 lg:grid-cols-2 xs:grid-cols-1 gap-4">
        {past.map((item: any, index) => (
          <SponsorCardSmall
            color="rgb(var(--background))"
            name={item.name}
            category={item.category}
            image={item.image}
            link={item.link}
            filter={item.filter || ''}
            key={index}
          />
        ))}
      </div>
    </Section>
  )
}