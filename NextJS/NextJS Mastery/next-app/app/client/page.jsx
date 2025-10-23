"use client"
import React, { useState } from "react";

const page = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>Welcome to Client Component</h1>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Increase by 1</button>
      <button onClick={() => setCounter(counter - 1)}>Decrease by 1</button>
    </div>
  );
};

export default page;
