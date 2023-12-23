"use client";

import { getDataFromLocal } from "@/lib/localStorage";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./Login";

export default function NavigationMenuDemo() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // [1
  useEffect(() => {
    const user = getDataFromLocal("user");
    if (user?.email) {
      setUser(user);
    }
    console.log(user, "navvv");
  }, []);

  function handleNav() {
    setOpen(!open);
  }
  return (
    <nav className="px-8 md:px-20  text-text  bg-accent">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            🍪 cryptomate
          </span>
        </Link>
        <button
          onClick={handleNav}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden hover:bg-gray-700 focus:outline-none  "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={` w-full md:block md:w-auto ${!open && "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 items-center  ">
            <li>
              <Link
                href="/"
                className="block hover:text-black py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0  "
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/coins"
                className="block py-2 px-3 rounded hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0 "
              >
                Coins
              </Link>
            </li>
            <li>
              <Link
                href="/coins/trending"
                className="hover:text-black block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0 "
              >
                Trending
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-black block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0 "
              >
                Contact
              </a>
            </li>

            {user?.email && (
              <li>
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </li>
            )}

            <li>{<Login user={user} setUser={setUser} />}</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
