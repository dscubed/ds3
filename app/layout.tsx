import { inter } from '@/app/fonts'
import '@/app/styles/globals.css'
import clsx from 'clsx'

const baseURL = 'https://' + process.env.DOMAIN_URL || 'localhost:3000'

export const metadata = {
  metadataBase: new URL(baseURL), // Only need to set once here
  title: "D3S | Data Science Student Society | The University of Melbourne",
  description: "D3S is the premier data science club at The University of Melbourne. Connect with our vibrant community, explore student-led workshops, and unlock career opportunities through networking events. Become a member today - it's free!",
  openGraph: {
    title: "D3S | Data Science Student Society | The University of Melbourne",
    description: "D3S is the premier data science club at The University of Melbourne. Connect with our vibrant community, explore student-led workshops, and unlock career opportunities through networking events. Become a member today - it's free!",
    url: '/',
    siteName: 'D3S',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    // Max 70 chars
    title: "D3S | Data Science Student Society | The University of Melbourne",
    // Max 200 chars
    description: 'D3S is the premier data science club at The University of Melbourne. Connect with our vibrant community, explore student-led workshops, and participate in networking events. Join us today!',
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
      </body>
    </html>
  )
}
