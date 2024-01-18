import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Section from "../Section";
import Link from "next/link";
import FAQList from "../faq/FAQList";

export default function FAQSection () {
  return (
    <Section>
      <div className="grid grid-cols-[auto,1fr] lg:grid-cols-1 gap-10">
        <h3 className="text-5xl sm:text-4xl max-w-lg sm:max-w-sm !leading-tight h-max">Frequently Asked Questions</h3>
        <div>
          <FAQList />
          <div className="flex gap-4 py-8">
            <Link className="flex gap-2 text-xl text-theme my-auto" href="mailto:hello@dscubed.org.au">
              <span className="my-auto">Get In Touch</span>
              <ArrowRightIcon className="w-6 h-6 my-auto" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}