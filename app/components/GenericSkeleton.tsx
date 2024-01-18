import clsx from 'clsx'

export default function Skeleton ({ className = '' }: { className?: string }) {
  return (
    <div className={clsx("animate-pulse w-full aspect-square bg-skeleton-content", className)}></div>
  )
}