'use client'
import dynamic from 'next/dynamic'
import ErrorPage from 'next/error'

const P5Map = dynamic(
  () => import('@/app/components/P5Map'),
  { ssr: false }
)

export default function Map () {
  // It is CRUCIAL that this page is only accessible in dev mode to prevent unwanted charges
  // from Google Static Map API
  if (process.env.NODE_ENV === 'production') {
    return <ErrorPage statusCode={404} />
  }

  return (
    <P5Map />
  )
}