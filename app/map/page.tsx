import dynamic from 'next/dynamic'

const P5Map = dynamic(
  () => import('@/app/components/P5Map'),
  { ssr: false }
)

export default function Map () {
  return (
    <P5Map />
  )
}