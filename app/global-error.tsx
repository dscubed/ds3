'use client'
import Error from '@/app/components/Error'

export default function GlobalError ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.log('Error: ' + error.message)
  console.log('Digest: ' + error.digest)

  return (
    <Error code={500} message="An unexpected internal error has occurred. Please try again or contact us if the issue persists. See console for details.">
      <button className="w-max bg-foreground text-background-secondary rounded-full py-2 px-4" onClick={() => reset()}>Try again</button>
    </Error>
  )
}