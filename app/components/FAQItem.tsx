'use client'
import { PlusIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { useState } from "react"

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
      className="flex flex-col border-b border-border py-8 transition-all cursor-pointer overflow-hidden"
      onClick={e => toggleAnswer(showAnswer ? false : true)}
    >
      <div className="grid grid-cols-[max-content,1fr] gap-x-4">
        <PlusIcon className={`w-8 h-8 text-text-secondary transition-all ${showAnswer ? 'rotate-45' : 'rotate-0'}`} />
        <h4 className="text-xl leading-relaxed my-auto">{question}</h4>
        <p className={`transition-all duration-300 text-xl text-text-secondary leading-relaxed col-start-2 ${showAnswer ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <span className="block pt-4">{answer}</span>
        </p>
      </div>
    </div>
  )
}