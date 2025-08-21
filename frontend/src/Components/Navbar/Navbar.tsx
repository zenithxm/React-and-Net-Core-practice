import React from "react";
import logo from "./logo.svg";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../Context/UserProvider";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedin, user, logoutUser } = useUserAuth();

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/" className="inline-flex w-12">
            <img src={logo} alt="" />
            <img src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        {isLoggedin() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="text-black">Hi, {user?.userName}</div>
            <a
              onClick={logoutUser}
              className="px-8 py-3 font-bold rounded text-black bg-lightGreen hover:opacity-70"
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-darkBlue">
              <Link to="login" className="text-black hover:text-darkBlue">
                Login
              </Link>
            </div>
            <Link
              to="register"
              className="px-8 py-3 font-bold rounded text-black bg-lightGreen hover:opacity-70"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
