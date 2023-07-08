"use client";

import "./globals.scss";
import { josefinSans } from "./util/font";
import React, { useContext, useState } from "react";
import { ThemeContext } from "./components/context/theme-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <html lang="en">
        <body className={josefinSans.className + ` theme-${theme}`}>
          {children}
        </body>
      </html>
    </ThemeContext.Provider>
  );
}
