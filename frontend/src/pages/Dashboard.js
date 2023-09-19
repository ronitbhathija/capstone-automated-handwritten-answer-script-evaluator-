
import React, { useState } from "react";
import Item1 from "../components/Item1";
import Item2 from "../components/Item2";
import Item3 from "../components/Item3";
import Item4 from "../components/Item4";

const Dashboard = ({ isLoggedIn }) => {
  const [activeItem, setActiveItem] = useState("Item1");

  const renderComponent = () => {
    switch (activeItem) {
      case "Item1":
        return <Item1 />;
      case "Item2":
        return <Item2 />;
      case "Item3":
        return <Item3 />;
      case "Item4":
        return <Item4 />;
      default:
        return <Item1 />;
    }
  };

  const isActive = (item) => (activeItem === item ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white");

  return (
    <div className="flex h-full space-x-4">
      <div className=" w-1/4 p-8 h-screen">
        <h2 className="text-3xl font-extrabold mb-8 text-white">Menu</h2>
        <ul>
          <li
            className={`mb-8 px-6 py-4 cursor-pointer rounded transition-all ${isActive("Item1")}`}
            onClick={() => setActiveItem("Item1")}
          >
            📌 Item1
          </li>
          <li
            className={`mb-8 px-6 py-4 cursor-pointer rounded transition-all ${isActive("Item2")}`}
            onClick={() => setActiveItem("Item2")}
          >
            📘 Item2
          </li>
          <li
            className={`mb-8 px-6 py-4 cursor-pointer rounded transition-all ${isActive("Item3")}`}
            onClick={() => setActiveItem("Item3")}
          >
            📊 Item3
          </li>
          <li
            className={`mb-8 px-6 py-4 cursor-pointer rounded transition-all ${isActive("Item4")}`}
            onClick={() => setActiveItem("Item4")}
          >
            🖼️ Item4
          </li>
        </ul>
      </div>
      <div className="w-3/4 h-full  p-8">{renderComponent()}</div>
    </div>
  );
};

export default Dashboard;
