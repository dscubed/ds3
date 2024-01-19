import MapMatrix from '@/app/components/home/MapMatrix'

export default function MapSection () {
  return (
    <>
      <div className="px-5">
        <div className="flex flex-col gap-10 max-w-screen-xl mx-auto">
          <h2 className="text-5xl sm:text-4xl !leading-tight text-center max-w-lg sm:max-w-sm mx-auto mb-10">Meet members from all over the world.</h2>
        </div>
      </div>
      <div className="w-full h-max max-w-screen-lg mx-auto">
        <MapMatrix></MapMatrix>
      </div>
    </>
  )
}