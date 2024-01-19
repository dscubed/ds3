import InfiniteBanner from '@/app/components/sponsors/InfiniteBanner'

const speakers = [
  '/sponsors/logos/citadel.svg',
  '/sponsors/logos/csiro.svg',
  '/sponsors/logos/deloitte.svg',
  '/sponsors/logos/liberty.svg',
  '/sponsors/logos/macquarie.svg',
  '/sponsors/logos/maltem.png',
  '/sponsors/logos/mantel-group.svg',
  '/sponsors/logos/plotly.png',
  '/sponsors/logos/rea-group.svg',
  '/sponsors/logos/seek.svg',
]

export default function SpeakersSection () {
  return (
    <div className="my-48 sm:my-24">
      <div className="flex flex-col gap-10 max-w-screen-xl mx-auto mb-10 px-5">
        <h3 className="text-2xl text-center">Past Speakers From</h3>
      </div>
      <InfiniteBanner images={speakers} speed={50000} />
    </div>
  )
}