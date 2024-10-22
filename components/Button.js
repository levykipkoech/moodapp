import React from 'react'

export default function Button(props) {
    const {text, dark} = props
  return (
   <button className={'duration-200 hover:opacity-60 border-2 border-solid rounded-full overflow-hidden border-indigo-600' + (dark ? 'text-white bg-indigo-600 ' : 'text-indigo-600')}>
    {text}
   </button>
  )
}
