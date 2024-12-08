import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { RootLayoutWrapper } from './components/RootLayoutWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Assistant App',
  description: 'Your personal AI assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
