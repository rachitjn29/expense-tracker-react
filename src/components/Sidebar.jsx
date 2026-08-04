import {
  ArrowLeftRight,
  ChartColumn,
  FileText,
  LayoutDashboard,
  Wallet,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: ChartColumn,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

const Sidebar = () => {
  return (
    <aside className="sidebar fixed left-0 top-0 flex flex-col w-72 h-screen bg-white text-black border-r p-6 ">
      <div className="flex items-center gap-3 mb-10">
        <Wallet className="Icon w-11 h-11 p-2 rounded-xl bg-indigo-700 text-white" />
        <h1 className="Title text-2xl font-bold tracking-wide">Spend Wiser</h1>
      </div>
      <nav className="mt-8 flex flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-xl tracking-wide transition-all duration-300 ${
                  isActive ? "bg-indigo-700 text-white" : " hover:bg-slate-200"}` }>

                <Icon size={30} />
                <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
