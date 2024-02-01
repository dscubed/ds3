import Image from 'next/image'
import Section from '@/app/components/Section'
import networkImage from '@/public/home/network.jpg'
import learningImage from '@/public/home/learning.jpg'
import industryImage from '@/public/home/staircase.jpg'
import personalGrowthImage from '@/public/home/liftoff.jpg'

export default function ReasonsSection () {
  return (
    <Section>
      <div className="grid grid-cols-[1fr,1fr] lg:grid-cols-1 lg:gap-20 sm:gap-10">
        <div className="">
          <div className="sticky max-w-sm sm:max-w-none top-[calc(102.55px+20px)]">
            <h2 className="text-5xl sm:text-4xl !leading-tight">Four Reasons to Join the Club</h2>
            {/* <p className="text-text-secondary text-xl leading-relaxed mt-10"></p> */}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-20 sm:gap-10 max-w-xl lg:max-w-none">
          <div className="flex flex-col gap-4 rounded-md">
            <Image
              className="w-full aspect-video object-cover rounded-2xl"
              src={industryImage}
              alt=""
            />
            <h3 className="text-2xl mt-2">Access to Industry Insights</h3>
            <p className="text-xl lg:text-lg leading-relaxed">Gain exclusive insights into the data science industry through guest lectures, networking events, and recruitment talks.</p>
          </div>
          <div className="flex flex-col gap-4 rounded-md">
            <Image
              className="w-full aspect-video object-cover rounded-2xl"
              src={learningImage}
              alt=""
            />
            <h3 className="text-2xl mt-2">Hands-On Learning</h3>
            <p className="text-xl lg:text-lg leading-relaxed">Participate in practical workshops and real-world projects to build and refine your data science skills.</p>
          </div>
          <div className="flex flex-col gap-4 rounded-md">
            <Image
              className="w-full aspect-video object-cover rounded-2xl"
              src={networkImage}
              alt=""
            />
            <h3 className="text-2xl mt-2">Expand Your Network</h3>
            <p className="text-xl lg:text-lg leading-relaxed">Connect with peers, alumni, and professionals, building a strong network that can open doors to future career opportunities.</p>
          </div>
          <div className="flex flex-col gap-4 rounded-md">
            <Image
              className="w-full aspect-video object-cover rounded-2xl"
              src={personalGrowthImage}
              alt=""
            />
            <h3 className="text-2xl mt-2">Foster Personal Growth</h3>
            <p className="text-xl lg:text-lg leading-relaxed">Develop not just academically and professionally, but also personally, in a vibrant community that values collaboration, innovation, and diversity.</p>
          </div>
        </div>
      </div>
    </Section>
  )
}