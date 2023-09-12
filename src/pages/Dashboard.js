import React, { useState } from "react";
import Item1 from "../components/Item1";
import Item2 from "../components/Item2";
import Item3 from "../components/Item3";
import Item4 from "../components/Item4";

const Home = ({ isLoggedIn }) => {
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

  const isActive = (item) => (activeItem === item ? "bg-gray-700" : "");

  return (
    <div className="flex h-full">
      <div className="bg-gray-800 w-1/5 p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Menu</h2>
        <ul>
          <li
            className={`mb-2 px-4 py-2 cursor-pointer rounded transition-all ${isActive(
              "Item1"
            )}`}
            onClick={() => setActiveItem("Item1")}
          >
            📌 Item1
          </li>
          <li
            className={`mb-2 px-4 py-2 cursor-pointer rounded transition-all ${isActive(
              "Item2"
            )}`}
            onClick={() => setActiveItem("Item2")}
          >
            📘 Item2
          </li>
          <li
            className={`mb-2 px-4 py-2 cursor-pointer rounded transition-all ${isActive(
              "Item3"
            )}`}
            onClick={() => setActiveItem("Item3")}
          >
            📊 Item3
          </li>
          <li
            className={`mb-2 px-4 py-2 cursor-pointer rounded transition-all ${isActive(
              "Item4"
            )}`}
            onClick={() => setActiveItem("Item4")}
          >
            🖼️ Item4
          </li>
        </ul>
      </div>
      <div className="w-4/5 h-full bg-gray-900 p-6">{renderComponent()}</div>
    </div>
  );
};

export default Home;