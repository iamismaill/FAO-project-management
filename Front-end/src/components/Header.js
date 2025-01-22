import { UserCircleIcon,User } from '@heroicons/react/24/outline'
import React from 'react'

function Header() {
  return (
    <header className="bg-[#009edb] text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center cursor-pointer">
          <img
            src="/foa_logo.png"
            alt="Logo"
            className="h-8 w-8"
          />
        </div>

        {/* Title Section */}
        <h1 className="text-xl font-semibold">FOA Projects Manger</h1>

        {/* User Profile Section */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">Hello, Admin</span>
          <UserCircleIcon className="h-5 w-5" />
        </div>
      </div>
    </header>
  )
}

export default Header