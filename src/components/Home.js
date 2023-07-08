import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ border: "2px solid gray" }} className="mt-16 w-[70%] m-auto ">
      <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-black dark:text-gray-400">
        <li class="mr-2">
          <Link
            to="/"
            aria-current="page"
            class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
          >
            Inbox
          </Link>
        </li>
        <li class="mr-2">
          <Link
            to="/sent"
            class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
          >
            Sent
          </Link>
        </li>
        <li class="mr-2">
          <Link
            to="/compose"
            class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
          >
            Compose
          </Link>
        </li>
        <li class="mr-2">
          <Link
            to="/"
            class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
          >
            Draft
          </Link>
        </li>
        {user ? (
          <div class="">
            <img class="h-8 w-8 rounded-full mt-2" src={user[0].photo} alt="" />
          </div>
        ) : (
          <li class="mr-2">
            <Link
              to="/register"
              class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
            >
              Login
            </Link>
          </li>
        )}
        {user && (
          <li
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
            class="mr-2"
          >
            <p class=" cursor-pointer ml-4 inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">
              Logout
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
