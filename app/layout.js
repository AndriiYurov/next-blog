"use client";
import TopNav from '@/components/TopNav';
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { SearchProvider } from '@/context/search';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <SearchProvider>
          <Toaster/>
          <TopNav/>
          {children}
          </SearchProvider>
        </SessionProvider>
        </body>
    </html>
  )
}
