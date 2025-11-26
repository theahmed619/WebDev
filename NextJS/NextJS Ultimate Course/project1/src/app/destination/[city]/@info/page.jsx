'use client'
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
    const {city}=useParams()
  return (
    <div className='text-white mt-[100%] w-[50%]' >
      {city} is the best city.
    </div>
  )
}

export default page