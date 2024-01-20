import Section from '@/app/components/Section'
import { gold } from '@/app/components/sponsors/sponsorData'
import SponsorCard from '@/app/components/sponsors/SponserCard'

export default function GoldTierSection () {
  return (
    <Section>
      {/* <h3 className="text-2xl text-center">Gold Sponsors</h3> */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
        {gold.map((item: any, index) => (
          <SponsorCard
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