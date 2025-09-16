import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ErrorBoundary } from '../components/ErrorBoundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CryptoPulse - Your Unified Crypto Portfolio Tracker',
  description: 'Monitor your crypto investments and receive timely market insights on Farcaster.',
  openGraph: {
    title: 'CryptoPulse',
    description: 'Your unified crypto portfolio tracker and alert system.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CryptoPulse',
    description: 'Your unified crypto portfolio tracker and alert system.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            <main className="min-h-screen bg-background">
              {children}
            </main>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
