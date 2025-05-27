import React from "react";
import { Link } from "react-router-dom";
import useStore from "../store/useStore";

export default function Header() {
  const { user, logout } = useStore();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Event Listing
      </Link>
      <nav>
        <Link to="/" className="mr-4 hover:underline">
          Home
        </Link>
        <Link to="/events" className="mr-4 hover:underline">
          Events
        </Link>
        {user && (
          <Link to="/dashboard" className="mr-4 hover:underline">
            Dashboard
          </Link>
        )}
        {user ? (
          <button onClick={logout} className="hover:underline cursor-pointer">
            Logout ({user.username})
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
