import React from 'react'

const Button = ({children,name, hello}) => {

  const handleClick=()=>{
      alert(`Hello, ${name}`)
  }

  return (

   <>

    <button onClick={handleClick}>
      {children}
    </button>

    <br/>
    <button onClick={hello} >
      {children}
    </button>
   </>
  )
}

export default Button