import React from 'react'
import Button from './Button'

const Home = () => {

  const helloOnClick=()=>{
      alert("Hello")
  }


  return (
    <>
      <p>
        This is Home Page

      </p>

      <Button name={"ahmy"} hello={helloOnClick}>
        <p> Click</p>
       
      </Button>
    </>
  )
}

export default Home