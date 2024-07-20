import Section from '@/app/components/Section'
import { silver } from '@/app/components/sponsors/sponsorData'
import SponsorCard from '@/app/components/sponsors/SponserCard'

export default function SilverSponsorSection () {
  return (
    <Section>
      <h3 className="text-2xl text-center">Silver Sponsors</h3>
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        {silver.map((item: any, index) => (
          <SponsorCard
            color="rgb(var(--silver))"
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