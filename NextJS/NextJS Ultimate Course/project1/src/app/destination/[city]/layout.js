import React from 'react'

const layout = ({children,info}) => {
  return (
    <div className='flex '>{children} {info}</div>
  )
}

export default layout