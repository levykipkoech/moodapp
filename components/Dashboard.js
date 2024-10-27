'use client';

import { Fugaz_One } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import Calender from './Calender';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import Loading from './Loading';
import Login from './Login';
import { db } from '@/firebase';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });

export default function Dashboard() {
  const { currentUser, userDataOb, setUserDataOb, loading } = useAuth();
  const [data, setData] = useState({});
  const now = new Date();

  function countValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }
    return {
      num_days: total_number_of_days,
      average_mood: sum_moods / total_number_of_days,
    };
  }
  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()} H. ${60 - now.getMinutes()} M. ${
      60 - now.getSeconds()
    } S`,
  };

  async function handleSetMood(mood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    if (!currentUser || !currentUser.uid) {
      console.log('No valid user ID found.');
      console.log('currentUser:', currentUser);
      console.log('userDataOb:', userDataOb);
      return;
    }

    try {
      const newData = { ...userDataOb };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData[year][month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;

      setData(newData);
      setUserDataOb(newData);

      const docRef = doc(db, 'users', currentUser.uid);
      await setDoc(
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
      console.log('failed to generate data: ', err.message);
    }
  }

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
              <p className="font-medium capitalize text-xs sm:text-sm truncate">
                {status.replaceAll('_', ' ')}
              </p>
              <p className={'text-base sm:text-lg truncate ' + fugaz.className}>
                {statuses[status]}{status=== 'num_days'? '🔥 ':''}
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
      <Calender completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
