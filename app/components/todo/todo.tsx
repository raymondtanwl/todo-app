"use client";

import { josefinSans } from "@/app/util/font";
import Image from "next/image";
import { useState } from "react";
import "./todo.scss";

export default function Todo() {
  const [theme, setTheme] = useState("light");
  const initList = [
    "Complete online JavaScript course",
    "Jog around the park 3x",
    "10 minutes meditation",
  ];
  const [todoItems, setTodoItems] = useState(initList);

  function onInputKeyDown(e: any) {
    // on enter key
    if (e.keyCode === 13) {
      setTodoItems([...todoItems, e.target.value]);
    }
  }

  function onRemove(idx: any) {
    console.log("onRemove", idx);
    setTodoItems(todoItems.filter((itm, index) => index !== idx));
  }

  return (
    <div className="todo-main-container">
      <div className="top-bg"></div>
      {/* <Image
        src="/images/bg-desktop-light.jpg"
        alt="bg light"
        width={100}
        height={100}
        layout="responsive"
      /> */}
      <div className="center-container">
        <div className="center-content">
          <div className="title-container">
            <h2>TODO</h2>
            <Image
              src="/images/icon-moon.svg"
              alt="moon"
              width={26}
              height={26}
            />
          </div>
          <div className="add-input">
            <input
              className={josefinSans.className + " todo-input"}
              type="text"
              placeholder="Create a new todo..."
              onKeyDown={(e) => onInputKeyDown(e)}
            />
            {/* <button onClick={(e) => onInputKeyDown(e)}>test</button> */}
          </div>
          <div className="list-container">
            {todoItems.map((itm, index) => {
              return (
                <div key={index} className="list-item">
                  <div className="left">
                    <div className="checkbox">
                      {/* <Image
                        src="/images/icon-check.svg"
                        alt="check"
                        width={20}
                        height={20}
                      /> */}
                    </div>
                    {itm}
                  </div>
                  <div className="remove" onClick={() => onRemove(index)}>
                    <Image
                      src={"/images/icon-cross.svg"}
                      alt="cross"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              );
            })}
            {/* <div className="list-item">Complete online JavaScript course</div>
            <div className="list-item">Jog around the park 3x</div>
            <div className="list-item">10 minutes meditation</div> */}
            <div className="list-bottom">
              <div className="left">{todoItems.length} items left</div>
              <div className="center">
                <div className="filter-option">All</div>
                <div className="filter-option">Active</div>
                <div className="filter-option">Completed</div>
              </div>
              <div className="right">Clear Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
