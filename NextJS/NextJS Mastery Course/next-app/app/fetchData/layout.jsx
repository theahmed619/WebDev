import React from "react";
import Link from "next/link";

const layout = ({ children }) => {
  return (
    <div>
    <h1>Fetching Data</h1>
      <div>
        <ul>
          <li>
            <Link href={"/fetchData/client"}>
              Fetch data using client component
            </Link>
          </li>
          <li>
            <Link href={"/fetchData/server"}>
              Fetch data using server component
            </Link>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default layout;
