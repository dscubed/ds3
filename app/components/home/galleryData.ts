import event1Image from '@/public/gallery/event1.jpg'
import event2Image from '@/public/gallery/event2.jpg'
import { StaticImageData } from 'next/image'

const data: { src: StaticImageData, description: string }[] = [
  {
    src: event1Image,
    description: ''
  },
  {
    src: event2Image,
    description: ''
  },
]

export default data