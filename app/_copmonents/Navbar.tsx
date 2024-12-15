/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useLogoutUserMutation } from "@/redux/features/auth/apiauth";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const { token } = useSelector((state: any) => state.auth); // Explicit typing if possible
  const [logout] = useLogoutUserMutation();
  const isAuthenticated = !!token;

  const handleLogout = async () => {
    await logout({});
    console.log("User logged out");
  };

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Task List", path: "/tasklist" },
  ];

  useEffect(() => {
    const currentPath = navItems.find((item) => item.path === pathname)?.name;
    if (currentPath) setActive(currentPath);
  }, [pathname]);

  const handleClick = (path: string) => {
    setActive(path);
    router.push(path);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">To-do-App</div>
      <div className="flex items-center space-x-6">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleClick(item.path)}
            className={`font-medium ${
              active === item.name ? "text-blue-500 font-bold" : "text-gray-800"
            } hover:text-blue-500`}
          >
            {item.name}
          </button>
        ))}
        {isAuthenticated ? (
          <button onClick={handleLogout} className="hover:text-gray-300">
            Logout
          </button>
        ) : (
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
