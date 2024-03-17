import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import App from "./App";
import "./index.css";
import { useTheme } from "./lib";

export default function Main() {
  const { theme, toggleTheme } = useTheme();

  return (
    <React.StrictMode>
      <NextUIProvider theme={theme}>
        <main id="app" className={`${theme} bg-background dark:bg-black`}>
          <App theme={theme} toggleTheme={toggleTheme} />
        </main>
      </NextUIProvider>
    </React.StrictMode>
  );
}

// Render your main function
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
