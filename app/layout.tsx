import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { inter } from '@/app/fonts'
import '@/app/styles/globals.css'
import clsx from 'clsx'

const baseURL = 'https://' + process.env.DOMAIN_URL || 'localhost:3000'

export const metadata = {
  metadataBase: new URL(baseURL), // Only need to set once here
  title: "DSCubed | Data Science Student Society | The University of Melbourne",
  description: "DSCubed is the premier data science club at The University of Melbourne. Connect with our vibrant community, explore student-led workshops, and unlock career opportunities through networking events. Become a member today - it's free!",
  openGraph: {
    title: "DSCubed | Data Science Student Society | The University of Melbourne",
    description: "DSCubed is the premier data science club at The University of Melbourne. Connect with our vibrant community, explore student-led workshops, and unlock career opportunities through networking events. Become a member today - it's free!",
    url: '/',
    siteName: 'DSCubed',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    // Max 70 chars
    title: "DSCubed | Data Science Student Society | The University of Melbourne",
    // Max 200 chars
    description: 'DSCubed is the premier data science club at The University of Melbourne. Connect with our vibrant community, explore student-led workshops, and participate in networking events. Join us today!',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx('dark', inter.className)}>
      <head>
        {/* DO NOT REMOVE */}
        <link rel="author" href="humans.txt" />
      </head>
      <body className="flex flex-col w-screen min-h-screen bg-background-secondary text-foreground">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
