import { UserIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

export default function GenericAvatar ({ className = '' }: { className?: string }) {
  return (
    <div className={clsx("flex bg-skeleton-content w-16 h-16 rounded-full overflow-hidden", className)}>
      <UserIcon className="w-full h-full text-skeleton-background m-auto mb-[-15%]"/>
    </div>
  )
}