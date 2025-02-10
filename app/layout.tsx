import './globals.css'
import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
})

export const metadata: Metadata = {
  title: 'فروشگاه چرتکه - آموزش محاسبات ذهنی و رباتیک',
  description: 'بسته‌های آموزشی محاسبات ذهنی و رباتیک برای کودکان و نوجوانان',
  keywords: ['چرتکه', 'محاسبات ذهنی', 'رباتیک', 'آموزش کودکان'],
  openGraph: {
    title: 'فروشگاه چرتکه - آموزش محاسبات ذهنی و رباتیک',
    description: 'بسته‌های آموزشی محاسبات ذهنی و رباتیک برای کودکان و نوجوانان',
    type: 'website',
    locale: 'fa_IR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}