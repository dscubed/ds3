import event1Image from '@/public/gallery/event1.jpg'
import event2Image from '@/public/gallery/event2.jpg'
import event3Image from '@/public/gallery/event3.jpg'
import event4Image from '@/public/gallery/event4.jpg'
import { StaticImageData } from 'next/image'

const data: { src: StaticImageData, description: string }[] = [
  {
    src: event3Image,
    description: ''
  },
  {
    src: event1Image,
    description: ''
  },
  {
    src: event4Image,
    description: ''
  },
  {
    src: event2Image,
    description: ''
  },
]

export default data