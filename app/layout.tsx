import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'

const nextFont = IBM_Plex_Mono({ weight: '500', subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'pCLoud Integrations',
  description: `Kidroca's portal for pCloud Integrations`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nextFont.className}>{children}</body>
    </html>
  )
}
