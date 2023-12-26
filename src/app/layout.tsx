import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StoreProvider from '@/lib/redux/storeProvider';
import { LangContextProvider } from '@/lib/context/langContext';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiQL App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <LangContextProvider>
            <Header />
            {children}
            <Footer />
          </LangContextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
