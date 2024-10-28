import { Fugaz_One, Open_Sans } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { AuthProvider } from '@/context/AuthContext';
import Head from './head';
import Logout from '@/components/LogOut';


const opensans = Open_Sans({ subsets: ['latin'] });
const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });
export const metadata = {
  title: 'moodap',
  description: 'Track your daily mood',
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href="/">
        <h1 className={'text-base sm:text-2xl textGradient ' + fugaz.className}>
          Moodap
        </h1>
      </Link>

      <Logout/>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={'text-indigo-400 ' + fugaz.className}>
        <span>@levy_314</span>
      </p>
    </footer>
  );

  return (
    <html lang="en">
      <Head/>
      <AuthProvider>
        <body
          className={
            'w-full max-w-[1000px] text-slate-800 mx-auto text-sm sm:text-base min-h-screen flex flex-col ' +
            opensans.className
          }
        >
          {header}
          {children}
          {footer}
          <footer></footer>
        </body>
      </AuthProvider>
    </html>
  );
}
