import { NavLink } from "react-router-dom";
import ToggleView from "./ToggleView";

const NAV_LINKS = [
  { to: "/projects", label: "Projects" },
  { to: "/certificates", label: "Certificates" }
];

function Navbar({
  menuStatus,
  updateStatus
}: {
  menuStatus: boolean;
  updateStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="py-6 sm:py-8 px-6 md:px-8 lg:px-10 border-b border-slate-400 dark:border-slate-700">
      <nav
        aria-label="Main Navigation"
        className="flex justify-between items-center"
      >
        <NavLink
          className={"text-2xl sm:text-3xl md:text-4xl z-20"}
          to={"/"}
          onClick={() => updateStatus(false)}
        >
          Gasser Elnaggar
        </NavLink>

        <ul className="hidden sm:flex sm:items-center sm:text-md md:text-lg lg:text-xl sm:space-x-3 md:space-x-4 lg:space-x-6">
          {NAV_LINKS.map(link => {
            return (
              <li key={link.label} className="hover:scale-105 duration-200">
                <NavLink
                  className={({ isActive }) =>
                    `hover:underline underline-offset-6 ${isActive ? "underline" : ""}`
                  }
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}

          <li className="hover:scale-105 duration-200">
            <NavLink
              className={({ isActive }) =>
                `hover:underline underline-offset-6 text-purple-600 dark:text-cyan-400 ${isActive ? "underline" : ""}`
              }
              to={"/minesweeper"}
              onClick={() => updateStatus(false)}
            >
              Minesweeper
            </NavLink>
          </li>

          <li>
            <ToggleView />
          </li>
        </ul>

        {/* Hamburger Toggle */}
        <div className="flex items-center sm:hidden">
          <button
            aria-label="Toggle Menu"
            aria-expanded={menuStatus}
            data-status={menuStatus}
            onClick={() => updateStatus(s => !s)}
            type="button"
            className="relative group w-5 h-5 z-20 focus:outline-none cursor-pointer hover:scale-105"
          >
            <span className="bg-slate-950 dark:bg-slate-50 group-data-[status=true]:rotate-45 group-data-[status=true]:translate-y-1.5 absolute w-6 h-0.5 top-0 left-0 rotate-0 transition-all duration-200"></span>

            <span className="bg-slate-950 dark:bg-slate-50 group-data-[status=true]:hidden translate-y-1.75 absolute w-6 h-0.5 top-0 left-0 rotate-0 transition-all duration-200"></span>

            <span className="bg-slate-950 dark:bg-slate-50 group-data-[status=true]:-rotate-45 group-data-[status=true]:translate-y-1.5 translate-y-3.5 absolute w-6 h-0.5 top-0 left-0 rotate-0 transition-all duration-200"></span>
          </button>
        </div>

        {/* Hamburger Menu */}
        {menuStatus && (
          <div className="sm:hidden text-xl pt-50 opacity-90 z-10 fixed inset-0 tracking-widest bg-slate-300 dark:bg-mist-800 transition-colors duration-300 ease-in-out uppercase">
            <ul className="flex flex-col items-center space-y-8">
              {NAV_LINKS.map(link => {
                return (
                  <li key={link.label} className="hover:scale-105 duration-200">
                    <NavLink
                      className={({ isActive }) =>
                        `hover:underline underline-offset-6 ${isActive ? "underline" : ""}`
                      }
                      to={link.to}
                      onClick={() => updateStatus(false)}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}

              <li className="hover:scale-105 duration-200">
                <NavLink
                  className={({ isActive }) =>
                    `hover:underline underline-offset-6 text-purple-600 dark:text-cyan-400 ${isActive ? "underline" : ""}`
                  }
                  to={"/minesweeper"}
                  onClick={() => updateStatus(false)}
                >
                  Play Minesweeper
                </NavLink>
              </li>

              <li>
                <ToggleView />
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
