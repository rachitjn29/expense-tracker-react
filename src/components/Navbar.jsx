import { Bell, User } from 'lucide-react'
import React from 'react'

const Navbar = ({title}) => {
  return (
    <header className=" ml-72 flex h-20 items-center justify-between bg-white px-6 border-b">
        {/* Page name left */}
      <div>
        <h1 className="text-2xl font-bold">
          {title}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button className="rounded-lg p-2 hover:bg-slate-100 transition">
          <Bell className="h-6 w-6 text-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-400 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-800 text-black">
            <User className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-sm font-medium text-black">User</p>
            <p className="text-xs text-slate-500">Welcome Back</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
