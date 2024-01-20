import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

const P5Map = dynamic(
  () => import('@/app/components/map/PixelMap'),
  { ssr: false }
)

export default function Map () {
  // It is CRUCIAL that this page is only accessible in dev mode to prevent unwanted charges
  // from Google Static Map API
  if (process.env.NODE_ENV === 'production') {
    return notFound()
  }

  return (
    <P5Map />
  )
}