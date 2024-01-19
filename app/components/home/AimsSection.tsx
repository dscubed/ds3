import Section from '@/app/components/Section'

export default function AimsSection() {
  return (
    <Section>
      <h2 className="text-5xl sm:text-4xl">Club Aims</h2>

      <div className="grid grid-cols-3 gap-10 lg:grid-cols-2 sm:grid-cols-1">
        <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
          <h4 className="text-xl text-theme">Connection</h4>
          <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To provide an environment that encourage Data Science students to connect through social events and study groups.</p>
        </div>
        <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
          <h4 className="text-xl text-theme">Education</h4>
          <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To provide seminars, workshops and discussions on Data Science & AI subjects to broaden and improve students’ skills and knowledge.</p>
        </div>
        <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
          <h4 className="text-xl text-theme">Events</h4>
          <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To host events that provide opportunities for students to network with Data Science research and industry partners.</p>
        </div>
        <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
          <h4 className="text-xl text-theme">Advocacy</h4>
          <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To co-ordinate the representation of Data Science students to the Science and Computer Science Faculties, and to the University.</p>
        </div>
        <div className="flex flex-col gap-4 max-w-[300px] sm:max-w-none">
          <h4 className="text-xl text-theme">Support</h4>
          <p className="text-text-secondary text-xl lg:text-lg leading-relaxed">To support students and their studies with Data Science related courses. </p>
        </div>
      </div>
    </Section>
  )
}