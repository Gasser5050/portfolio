import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppLayout() {
  const { state } = useNavigation();
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("THEME") || "false");
  });
  const [menuStatus, setMenuStatus] = useState(false);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ease-in-out ${darkMode ? "dark bg-darkBlue" : "bg-slate-100"} text-neutral-950 dark:text-slate-50 ${menuStatus ? "h-screen overflow-hidden" : ""}`}
    >
      {state === "loading" && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/10">
          <div className="w-25 h-25 border-5 border-[hsl(200,100%,10%)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <ThemeContext.Provider value={{ darkMode, toggleMode: setDarkMode }}>
        <Navbar menuStatus={menuStatus} updateStatus={setMenuStatus} />
      </ThemeContext.Provider>

      <main className={`${menuStatus ? "blur-md" : ""}`}>
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration />
    </div>
  );
}

export default AppLayout;
