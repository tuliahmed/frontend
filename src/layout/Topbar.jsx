import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import Dropdown from "../components/Dropdown.jsx";
import { Avatar } from "../components/ui.jsx";
import useTheme from "../hooks/useTheme.js";
import { notifications, notificationTone } from "../data/notifications.js";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

// ==================== Redux ====================
const mapStateToProps = (state) => {
  return {
    a_token:state.Auth_Reducer.a_token,
    userId: state.Auth_Reducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Logout action যোগ করলে এখানে দাও
  };
};

// ==================== Static Data ====================
const iconBtn =
  "rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white";

const menu = [
  { to: "/profile", icon: "user", label: "My profile" },
  { to: "/orders", icon: "box", label: "My orders" },
];

// ==================== Topbar ====================
function Topbar(props) {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();
  const unread = notifications.filter((n) => n.unread).length;
  const {
    onMenu, a_token, userId 
  }=props

  // ✅ Login state
  

  // ==================== Logout Handler ====================
  const handleLogout = () => {
    // localStorage clear
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userId");
    localStorage.removeItem("router");

    // Redux clear (action থাকলে dispatch করো)
    // dispatch(Logout());

    // Redirect
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 sm:px-6">
      <button
        onClick={onMenu}
        className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:hidden"
        aria-label="Open menu"
      >
        <Icon name="menu" className="h-5 w-5" />
      </button>

      {/* ==================== Search ==================== */}
      <div className="relative hidden w-full max-w-sm md:block">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
        <input
          placeholder="Search products..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-800 dark:focus:ring-red-500/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        {/* ==================== Cart Icon ==================== */}
        <Link to="/cart" className={iconBtn} aria-label="Cart">
          <Icon name="shoppingCart" className="h-5 w-5" />
        </Link>

        {/* ==================== Conditional Rendering ==================== */}
        {!a_token? (
          // ❌ User login নেই → Sign In button
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-full bg-[#f43f5e] hover:bg-[#e11d48] px-4 py-2 text-sm font-semibold text-white transition"
          >
            
            Sign In
          </Link>
        ) : (
          // ✅ User login আছে → Profile dropdown
          <Dropdown
            panelClass="w-60"
            button={(open) => (
              <button
                className={`ml-1 flex items-center gap-2 rounded-full py-1 pl-1 pr-1 hover:bg-slate-100 dark:hover:bg-slate-800 lg:pr-2 ${
                  open ? "bg-slate-100 dark:bg-slate-800" : ""
                }`}
              >
                <Avatar initials="C" className="h-8 w-8 text-xs" />
                <div className="hidden whitespace-nowrap text-left leading-tight lg:block">
                  <div className="text-sm font-semibold">Client</div>
                </div>
                <Icon
                  name="chevron"
                  className={`hidden h-4 w-4 text-slate-400 transition lg:block ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          >
            {(close) => (
              <>
                {/* Profile header */}
                <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <Avatar initials="C" className="h-10 w-10 text-sm" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">Client</div>
                    <div className="truncate text-xs text-slate-500 dark:text-slate-400">
                      example@gmail.com
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                {/* <div className="p-1.5">
                  {menu.map((m) => (
                    <Link
                      key={m.to}
                      to={m.to}
                      onClick={close}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      <Icon name={m.icon} className="h-4 w-4" />
                      {m.label}
                    </Link>
                  ))}

                  
                  <button
                    onClick={() => {
                      close();
                      toggleTheme();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <Icon
                      name={theme === "dark" ? "sun" : "moon"}
                      className="h-4 w-4"
                    />
                    {theme === "dark" ? "Light mode" : "Dark mode"}
                  </button>
                </div> */}

                {/* Logout */}
                <div className="border-t border-slate-100 p-1.5 dark:border-slate-800">
                  <button
                    onClick={() => {
                      close();
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                  >
                    <Icon name="logout" className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              </>
            )}
          </Dropdown>
        )}
      </div>
    </header>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);