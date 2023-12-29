import { inter } from '@/app/fonts'
import '@/app/styles/globals.css'

const baseURL = process.env.DOMAIN_URL
  ? `https://${process.env.DOMAIN_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(baseURL),
  title: 'DS3 - Data Science Student Society',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col w-screen min-h-screen bg-background-secondary text-foreground">
        {children}
      </body>
    </html>
  )
}
