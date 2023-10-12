// import React from 'react'

// const Dashboard = () => {
//   return (
//     <div className='text-white'>
//       student dashboard
//     </div>
//   )
// }

// export default Dashboard

import React, { useState } from "react";
import Item5 from "../components/Item5";
import Item6 from "../components/Item6";
import Item7 from "../components/Item7";
import Item8 from "../components/Item8";

function decodeBase64Url(token) {
  let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}


const Dashboard = ({ isLoggedIn, token }) => {
  const [activeItem, setActiveItem] = useState("Item5");

  const tokenPayload = decodeBase64Url(token.split(".")[1]);
  // console.log(tokenPayload)

  const renderComponent = () => {
    switch (activeItem) {
      case "Item5":
        return <Item5 tokenPayload={tokenPayload} />;
      case "Item6":
        return <Item6 />;
      case "Item7":
        return <Item7 />;
      case "Item8":
        return <Item8 />;
      default:
        return <Item5 />;
    }
  };

  const isActive = (item) => (activeItem === item ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white");




  return (
    <div className="flex h-full space-x-4">
      <div className=" w-1/4 p-8 h-screen">
        <h2 className="text-3xl font-extrabold mb-8 text-white">Menu</h2>
        <ul>
          <li
            className={`mb-8 px-6 py-4 cursor-pointer rounded transition-all ${isActive("Item5")}`}
            onClick={() => setActiveItem("Item5")}
          >
            📌 Item5
          </li>
          <li
            className={`mb-8 px-6 py-4 cursor-pointer rounded transition-all ${isActive("Item6")}`}
            onClick={() => setActiveItem("Item6")}
          >
            📘 Item6
          </li>
          <li
            className={`mb-8 px-6 py-4 cursor-pointer rounded transition-all ${isActive("Item7")}`}
            onClick={() => setActiveItem("Item7")}
          >
            📊 Item7
          </li>
          <li
            className={`mb-8 px-6 py-4 cursor-pointer rounded transition-all ${isActive("Item8")}`}
            onClick={() => setActiveItem("Item8")}
          >
            🖼️ Item8
          </li>
        </ul>
      </div>
      <div className="w-3/4 h-full  p-8">{renderComponent()}</div>
    </div>
  );
};

export default Dashboard;

