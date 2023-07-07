"use client";

import { josefinSans } from "@/app/util/font";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./todo.scss";

interface TodoItem {
  text: string;
  done: boolean;
}

export default function Todo() {
  const [theme, setTheme] = useState("light");
  const [filter, setFilter] = useState("All");
  const initList: TodoItem[] = [
    { text: "Complete online JavaScript course", done: true },
    { text: "Jog around the park 3x", done: false },
    { text: "10 minutes meditation", done: false },
    { text: "Read for 1 hour", done: false },
    { text: "Pick up groceries", done: false },
    { text: "Complete Todo App on Frontend Mentor", done: false },
  ];
  const [todoInput, setTodoInput] = useState("");
  const [todoItems, setTodoItems] = useState(initList);
  const [filteredItems, setFilteredItems] = useState(initList);

  useEffect(() => {
    function filterList(filterType: string) {
      console.log("filterList", filterType);
      setFilter(filterType);
      switch (filterType) {
        case "All":
          return todoItems;
        case "Active":
          return todoItems.filter((itm) => !itm.done);
        case "Completed":
          return todoItems.filter((itm) => itm.done);
        default:
          return todoItems;
      }
    }
    setFilteredItems(filterList(filter));
  }, [filter, todoItems]);

  function onInputKeyDown(e: any) {
    // on enter key
    if (e.keyCode === 13) {
      setTodoItems([...todoItems, { text: todoInput, done: false }]);
      setTodoInput("");
    }
  }

  function onInputChange(e: any) {
    setTodoInput(e.target.value);
    console.log("onInputChange", todoInput);
  }

  function onRemove(idx: any) {
    console.log("onRemove", idx);
    setTodoItems(todoItems.filter((itm, index) => index !== idx));
  }

  function onChecked(idx: any) {
    console.log("onChecked", idx);
    setTodoItems(
      todoItems.map((itm, index) => {
        if (index === idx) {
          return { ...itm, done: !itm.done };
        } else {
          return itm;
        }
      })
    );
  }

  function clearCompleted() {
    console.log("clearCompleted");
    setTodoItems(todoItems.filter((itm) => !itm.done));
  }

  function changeTheme(theme: string) {
    console.log("changeTheme", theme);
    setTheme(theme);
  }

  return (
    <div className={"todo-main-container " + (theme === "dark" ? "dark" : "")}>
      <div className="top-bg"></div>
      <div className="center-container">
        <div className="center-content">
          <div className="title-container">
            <h2 className="title">TODO</h2>
            <div className="theme-switcher">
              {theme === "light" ? (
                <Image
                  src="/images/icon-moon.svg"
                  alt="moon"
                  width={26}
                  height={26}
                  onClick={() => changeTheme("dark")}
                />
              ) : (
                <Image
                  src="/images/icon-sun.svg"
                  alt="sun"
                  width={26}
                  height={26}
                  onClick={() => changeTheme("light")}
                />
              )}
            </div>
          </div>
          <div className="add-input">
            <div className="checkbox"></div>
            {/* use josefinSans.className to ensure the correct font-family is applied */}
            <input
              className={josefinSans.className + " todo-input"}
              type="text"
              placeholder="Create a new todo..."
              onKeyDown={(e) => onInputKeyDown(e)}
              onChange={(e) => onInputChange(e)}
              value={todoInput}
            />
          </div>
          <div className="list-container">
            {filteredItems.map((itm, index) => {
              return (
                <div key={index} className="list-item hover-pointer">
                  <div className={"left " + (itm.done ? "checked" : "")}>
                    <div
                      className={"checkbox " + (itm.done ? "checked" : "")}
                      onClick={() => onChecked(index)}
                    ></div>
                    {itm.text}
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

            <div className="list-bottom">
              <div className="left">
                {todoItems.filter((itm) => !itm.done).length} items left
              </div>
              <div className="center">
                <div
                  className={
                    "filter-option " + (filter === "All" ? "active" : "")
                  }
                  onClick={() => setFilter("All")}
                >
                  All
                </div>
                <div
                  className={
                    "filter-option " + (filter === "Active" ? "active" : "")
                  }
                  onClick={() => setFilter("Active")}
                >
                  Active
                </div>
                <div
                  className={
                    "filter-option " + (filter === "Completed" ? "active" : "")
                  }
                  onClick={() => setFilter("Completed")}
                >
                  Completed
                </div>
              </div>
              <div className="right" onClick={() => clearCompleted()}>
                Clear Completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
