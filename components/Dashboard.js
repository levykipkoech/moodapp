'use client';

import { Fugaz_One } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import Calender from './Calender';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import Loading from './Loading';
import Login from './Login';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Dashboard() {
  const { currentUser, userDataOb, setUserDataOb, loading } = useAuth();
  const [data, setData] = useState({});

  function countValues() {}

  async function handleSetMood(mood) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    try {
      const newData = { ...userDataOb };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;
      //update current state
      setData(newData);
      //update global state
      setUserDataOb(newData);
      //update firebase
      const docRef = doc(db, 'users', currentUser.iud);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log('failed to generate data', err.message);
    }
  }
  const statuses = {
    num_days: 14,
    time_remaining: '13:14:23',
    date: new Date().toDateString(),
  };

  const moods = {
    '&*@#$': '😭',
    sad: '😪',
    Existing: '😶',
    Good: '😊',
    Elated: '😍',
  };

  useEffect(() => {
    if (!currentUser || !userDataOb) {
      return;
    }
    setData(userDataOb);
  }, [currentUser, userDataOb]);

  if (loading) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Login />;
  }
  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 ">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-xl">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className="flex flex-col gap-1 sm:gap-2 ">
              <p className="font-medium uppercase text-xs sm:text-sm truncate">
                {status.replaceAll('_', ' ')}
              </p>
              <p className={'text-base sm:text-lg truncate ' + fugaz.className}>
                {statuses[status]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className
        }
      >
        How do you <span className="textGradient"> feel </span> today
      </h4>
      <div className="flex flex-stretch flex-wrap gap-4 ">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = moodIndex + 1;
                handleSetMood(currentMoodValue);
              }}
              className={
                'p-4 px-5 rounded-2xl purpleShadow flex flex-col flex-1 gap-2 items-center text-center duration-200 bg-indigo-50 hover:bg-[lavender] '
              }
              key={moodIndex}
            >
              <p className="text-3xl sm:text-4xl md:text-5xl">{moods[mood]}</p>
              <p
                className={
                  'text-indigo-500 text-xs sm:text-sm md:text-base ' +
                  fugaz.className
                }
              >
                {mood}
              </p>
            </button>
          );
        })}
      </div>
      <Calender data={data} handleSetMood={handleSetMood} />
    </div>
  );
}
