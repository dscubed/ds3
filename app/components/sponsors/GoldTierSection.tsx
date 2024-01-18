import Section from "../Section";
import { gold } from '@/app/components/sponsors/sponsorData'
import SponsorCard from "./SponserCard";

export default function GoldTierSection () {
  return (
    <Section>
      {/* <h4 className="text-2xl text-center">Gold Sponsors</h4> */}
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