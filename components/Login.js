import { Fugaz_One } from 'next/font/google';
import React from 'react';
import Button from './Button';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Login() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>
        Log in / Register
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        placeholder="email"
        className="w-full max-w-[400px] mx-auto px-4 py-2 duration-300 hover:border-indigo-600 focus:border-indigo-600
    sm:py-3 border-solid border-2 border-indigo-400 rounded-lg outline-none"
      />
      <input
        placeholder="password"
        type="password"
        className="w-full max-w-[400px] mx-auto px-4 py-2 duration-300 hover:border-indigo-600 focus:border-indigo-600
    sm:py-3 border-solid border-2 border-indigo-400 rounded-lg outline-none"
      />
      <div className="max-w-[400px] w-full mx-auto ">
        <Button text="Submit" full />
      </div>
      <p className='text-center'>Don&#39;t have an account? <span className='text-indigo-600'>Sign up</span></p>
    </div>
  );
}
