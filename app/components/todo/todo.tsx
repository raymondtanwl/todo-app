"use client";

import { josefinSans } from "@/app/util/font";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { ThemeContext } from "../context/theme-context";
import Filter from "../filter/filter";
import "./todo.scss";

// Your users should be able to:
// View the optimal layout for the app depending on their device's screen size
// Toggle light and dark mode
// Bonus: Drag and drop to reorder items on the list

interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}

export default function Todo() {
  // const [theme, setTheme] = useState("light");
  const { theme, setTheme } = useContext(ThemeContext);
  const [filter, setFilter] = useState("All");
  const [idSeq, setIIdSeq] = useState(6);
  const initList: TodoItem[] = [
    { id: 1, text: "Complete online JavaScript course", done: true },
    { id: 2, text: "Jog around the park 3x", done: false },
    { id: 3, text: "10 minutes meditation", done: false },
    { id: 4, text: "Read for 1 hour", done: false },
    { id: 5, text: "Pick up groceries", done: false },
    { id: 6, text: "Complete Todo App on Frontend Mentor", done: false },
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
      setTodoItems([
        ...todoItems,
        { id: idSeq + 1, text: todoInput, done: false },
      ]);
      setIIdSeq(idSeq + 1);
      setTodoInput("");
    }
  }

  function onInputChange(e: any) {
    setTodoInput(e.target.value);
    console.log("onInputChange", todoInput);
  }

  function onRemove(item: TodoItem) {
    console.log("onRemove", item);
    setTodoItems(todoItems.filter((itm) => item.id !== itm.id));
    setFilteredItems(filteredItems.filter((itm) => item.id !== itm.id));
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

  const handleThemeChange = () => {
    console.log("handleThemeChange", theme);
    const isCurrentDark = theme === "dark";
    setTheme(isCurrentDark ? "light" : "dark");
  };

  return (
    <div className={"todo-main-container"}>
      {/* debug view array */}
      {/* {todoItems.map((itm) => itm.text).join("|")} <br></br>
      {filteredItems.map((itm) => itm.text).join("|")} */}
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
                  onClick={() => handleThemeChange()}
                />
              ) : (
                <Image
                  src="/images/icon-sun.svg"
                  alt="sun"
                  width={26}
                  height={26}
                  onClick={() => handleThemeChange()}
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
            <ReactSortable list={filteredItems} setList={setFilteredItems}>
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
                    <div className="remove" onClick={() => onRemove(itm)}>
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
            </ReactSortable>

            <div className="list-bottom">
              <div className="left">
                {todoItems.filter((itm) => !itm.done).length} items left
              </div>
              <div className="desktop-filter">
                <Filter filter={filter} setFilter={setFilter} />

                {/* <div
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
                </div> */}
              </div>
              <div className="right" onClick={() => clearCompleted()}>
                Clear Completed
              </div>
            </div>
          </div>

          <div className="mobile-filter">
            <Filter filter={filter} setFilter={setFilter} mobile="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
