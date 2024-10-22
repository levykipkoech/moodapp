import { Fugaz_One } from 'next/font/google';
import React from 'react';
import Button from './Button';
import Calender from './Calender';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Hero() {
  return (
    <div className="py-10 md:py-10 flex flex-col gap-4 sm:gap-8">
      <h1
        className={
          'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className
        }
      >
        <span className="textGradient"> Moodap </span> helps you track your{' '}
        <span className="textGradient"> daily </span> mood!
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]">
        create your mood record and see how you feel on
        <span className="font-semibold"> everyday of every year.</span>
      </p>
      <div className='grid grid-cols-2 gap-4 mx-auto'>
      <Button text="sign up"/>
      <Button text="login" dark/>
      </div>
      <Calender/>
    </div>
  );
}
