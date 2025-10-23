import React from "react";

const fetchData = async () => {
  const api = await fetch("https://jsonplaceholder.typicode.com/todos");
  const result = await api.json();

  console.log("Result by Server component = ", result);

  

  return result;
};

const page = async () => {
  const data = await fetchData();
  return (
    <div>
      <h1>Fetching data using server component</h1>
      {data?.map((todos) => (
        <div key={todos.id}>
          <h1>{todos.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default page;
