import FAQItem from "./FAQItem";

const data = [
  {
    question: 'What is the difference between computer and data science?',
    answer: 'Computer science involves the study of algorithms, software development, and computer systems, while data science is a specialized field focused on extracting insights and knowledge from large datasets using statistical and machine learning techniques. Computer science forms the backbone of computing technologies, while data science is specifically geared toward analyzing and interpreting data to support decision-making in various domains.'
  },
  {
    question: 'How much does the membership cost?',
    answer: 'Computer science involves the study of algorithms, software development, and computer systems, while data science is a specialized field focused on extracting insights and knowledge from large datasets using statistical and machine learning techniques. Computer science forms the backbone of computing technologies, while data science is specifically geared toward analyzing and interpreting data to support decision-making in various domains.'
  },
  {
    question: 'When does the membership application open?',
    answer: 'Computer science involves the study of algorithms, software development, and computer systems, while data science is a specialized field focused on extracting insights and knowledge from large datasets using statistical and machine learning techniques. Computer science forms the backbone of computing technologies, while data science is specifically geared toward analyzing and interpreting data to support decision-making in various domains.'
  },
  {
    question: 'I\'m not a University of Melbourne student, can I still join?',
    answer: 'Computer science involves the study of algorithms, software development, and computer systems, while data science is a specialized field focused on extracting insights and knowledge from large datasets using statistical and machine learning techniques. Computer science forms the backbone of computing technologies, while data science is specifically geared toward analyzing and interpreting data to support decision-making in various domains.'
  },
]

export default function FAQSection () {
  return (
    <div className="flex flex-col">
      {data.map(item => (
        <FAQItem
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  )
}