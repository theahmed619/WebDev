"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await api.json();
      setData(result)
      console.log("Result", result);
    };

    fetchData();
  }, []);

  return <div>
    {data.map((user)=><div key={user.id} >
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </div>)}
  </div>;
};

export default page;
