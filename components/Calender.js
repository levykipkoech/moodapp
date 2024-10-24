import React from 'react';

const months = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sept',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec',
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function Calender() {
  const year = 2024;
  const month = 'October';
  const monthNow = new Date(year, Object.keys(months).indexOf(month), 1);

  const firstDayMonth = monthNow.getDay();
  const dayInMonth = new Date(
    year,
    Object.keys(months).indexOf(month) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayMonth + dayInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col overflow-hidden gap-1">
      {[...Array(numRows).keys()].map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid grid-cols-7 gap-1 ">
            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
              let dayIndex =
                rowIndex * 7 + dayOfWeekIndex - (firstDayMonth - 1);
              let dayDIsplay =
                dayIndex > dayInMonth
                  ? false
                  : row === 0 && dayOfWeek < firstDayMonth
                  ? false
                  : true;

              let isToday = dayIndex === now.getDate();
              if (!dayDIsplay) {
                return <div key={dayOfWeekIndex} className="bg-white" />;
              }
              let color = 33;
              return (
                <div
                  key={dayOfWeekIndex}
                  className={
                    'text-xs sm:text-sm border border-solod p-2 flex items-center gap-2 justify-between rounded-lg' +
                    (isToday ? ' border-indigo-500 ' : ' border-indigo-100 ') +
                    (color === 'white' ? ' text-indigo-400 ' : ' text-white ')
                  }
                >
                  <p>{dayIndex}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
