import { UserIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function AvatarGeneric ({ className = '' }: { className?: string }) {
  return (
    <div className={clsx("flex bg-background-secondary w-16 h-16 rounded-full overflow-hidden", className)}>
      <UserIcon className="w-full h-full text-foreground/10 m-auto mb-[-15%]"/>
    </div>
  )
}