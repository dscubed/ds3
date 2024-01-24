import FAQItem from '@/app/components/faq/FAQItem'

const data = [
  {
    question: 'How much does membership cost?',
    answer: 'Membership is completely free! We believe in making data science accessible to all interested students, so there are no fees to join and participate in our club activities.'
  },
  {
    question: 'I\'m not a University of Melbourne student. Can I still join the club?',
    answer: 'Unfortunately, our club is exclusive to University of Melbourne students. This ensures our resources and events are tailored specifically to our university community. However, we encourage you to engage with us through our public events and online resources.'
  },
  {
    question: 'Do I need a background in data science to join the club?',
    answer: 'No, a background in data science is not required to join. Our club welcomes members from all levels of expertise, from beginners to advanced practitioners. We offer resources and learning opportunities suitable for all members, regardless of their prior experience.'
  },
  {
    question: 'What is the difference between computer and data science?',
    answer: 'Computer science involves the study of algorithms, software development, and computer systems, while data science is a specialized field focused on extracting insights and knowledge from large datasets using statistical and machine learning techniques. Computer science forms the backbone of computing technologies, while data science is specifically geared toward analyzing and interpreting data to support decision-making in various domains.'
  },
]

export default function FAQList () {
  return (
    <div className="flex flex-col">
      {data.map((item, index) => (
        <FAQItem
          question={item.question}
          answer={item.answer}
          key={index}
        />
      ))}
    </div>
  )
}