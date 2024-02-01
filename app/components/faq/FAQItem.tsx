'use client'
import { PlusIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'

export default function FAQItem ({
  question,
  answer
}: {
  question: string,
  answer: string
}) {
  const [showAnswer, toggleAnswer] = useState(false)

  return (
    <div
      className="flex flex-col border-b border-border py-6 transition-all cursor-pointer overflow-hidden"
      onClick={e => toggleAnswer(showAnswer ? false : true)}
    >
      <div className="grid grid-cols-[max-content,1fr] gap-x-4">
        {/* Set icon height to line height */}
        <PlusIcon className={`w-7 sm:w-6 h-[calc(1.25rem*1.625)] sm:h-[calc(1.125rem*1.625)] text-text-secondary transition-all ${showAnswer ? 'rotate-45' : 'rotate-0'}`} />
        <h3 className="text-xl sm:text-lg leading-relaxed! my-auto">{question}</h3>
        <p className={`transition-all duration-300 text-xl sm:text-lg text-text-secondary leading-relaxed! col-start-2 ${showAnswer ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <span className="block pt-4">{answer}</span>
        </p>
      </div>
    </div>
  )
}