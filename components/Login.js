'use client';
import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react';
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [authenticating, setAuthenticating] = useState(false)

  const { signUp, login } = useAuth();

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true)
    try {
      if (isRegistered) {
        console.log('signing up a new user');
        await signUp(email, password);
      } else {
        console.log('logging in existing user');
        await login(email, password);
      }
    } catch (err) {
      console.log(err.message);
    }finally{
        setAuthenticating(false)
    }
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>
        {isRegistered ? 'Register' : 'Log in'}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
        className="w-full max-w-[400px] mx-auto px-4 py-2 duration-300 hover:border-indigo-600 focus:border-indigo-600
    sm:py-3 border-solid border-2 border-indigo-400 rounded-lg outline-none"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
        type="password"
        className="w-full max-w-[400px] mx-auto px-4 py-2 duration-300 hover:border-indigo-600 focus:border-indigo-600
    sm:py-3 border-solid border-2 border-indigo-400 rounded-lg outline-none"
      />
      <div className="max-w-[400px] w-full mx-auto ">
        <Button clickHandler={handleSubmit} text={authenticating?'Submitting':"Submit"} full />
      </div>
      <p className="text-center">
        {isRegistered ? 'Already have an account? ' : "Don't have an account? "}
        <button
          onClick={() => {
            setIsRegistered(!isRegistered);
          }}
          className="text-indigo-600"
        >
          {isRegistered ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  );
}
