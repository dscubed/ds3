import clsx from 'clsx'

export default function Section ({ 
  className, 
  children, 
  ...props 
}: {
  className?: string,
  children?: React.ReactNode
}) {
  return (
    <section {...props} className={clsx('px-5 my-40 sm:my-24', className)}>
      <div className="flex flex-col gap-10 max-w-screen-xl lg:max-w-screen-sm mx-auto">
        {children}
      </div>
    </section>
  )
}