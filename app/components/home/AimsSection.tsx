import Section from '@/app/components/Section'

export default function AimsSection() {
  return (
    <Section>
      <h2 className="text-5xl sm:text-4xl">Club Values</h2>

      <div className="grid grid-cols-3 gap-10 lg:grid-cols-2 sm:grid-cols-1">
        <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
          <h3 className="text-xl text-theme">Curiosity</h3>
          <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">We cultivate a culture of curiosity, encouraging our members to ask questions, explore new concepts in data science, and continually seek out learning opportunities, both academically and in the real world.</p>
        </div>
        <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
          <h3 className="text-xl text-theme">Collaboration</h3>
          <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">Our society thrives on collaboration, fostering a culture where members share knowledge, work together on projects, and learn from diverse perspectives.</p>
        </div>
        <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
          <h3 className="text-xl text-theme">Diversity & Inclusion</h3>
          <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">We are committed to creating an inclusive community where diversity is celebrated, ensuring everyone has a voice and can contribute fully to our collective success.</p>
        </div>
      </div>
    </Section>
  )
}