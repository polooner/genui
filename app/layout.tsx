import '@/app/globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Next.js AI Chatbot',
    template: `%s - Next.js AI Chatbot`,
  },
  description: 'An AI-powered chatbot template built with Next.js and Vercel.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('font-sans antialiased')}>
        <Toaster position='top-center' />
        <Providers
          attribute='class'
          defaultTheme='dark'
          disableTransitionOnChange
        >
          <div className='flex flex-col min-h-screen'>
            <main className='flex flex-col flex-1 bg-black'>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
