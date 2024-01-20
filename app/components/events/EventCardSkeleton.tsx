export default function EventCardSkeleton () {
  return (
    <div className="w-[350px] max-w-full h-full rounded-2xl bg-skeleton-background">
      <div className="animate-pulse flex flex-col w-full">
        <div className="block w-full aspect-square object-cover rounded-2xl bg-skeleton-content"></div>
        <div className="flex flex-col gap-2 p-4 w-full h-full">
          <div className="block w-[80%] h-5 bg-skeleton-content rounded-lg"></div>
          <div className="block w-[30%] h-5 bg-skeleton-content rounded-lg"></div>
          <div className="block w-full h-5 bg-skeleton-content rounded-lg"></div>
          <div className="block w-full h-5 bg-skeleton-content rounded-lg"></div>
          <div className="block w-full h-5 bg-skeleton-content rounded-lg"></div>
          <div className="block w-full h-5 bg-skeleton-content rounded-lg"></div>
          <div className="block w-[40%] h-5 bg-skeleton-content rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}