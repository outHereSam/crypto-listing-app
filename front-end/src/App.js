import { useEffect, useContext } from "react";
import { Header } from "./components/Header";
import { Routes } from "./Routes";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [theme]);

  return (
    <>
      <Header />
      <div className="dark:bg-dark-mode-bg-lighter">
        <Routes />
      </div>
    </>
  );
}

export default App;
