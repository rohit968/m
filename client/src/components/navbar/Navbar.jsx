import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Menu from "../menu/Menu";
import logo from "../../assets/logo.png";
import { UserContext } from "../../UserContext";
import axios from "axios";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [accountToggle, setAccountToggle] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const { userData, setUserData, setIsLoggedIn, isLoggedIn } =
    useContext(UserContext);

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  const handleAccountButton = () => {
    setAccountToggle(!accountToggle);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== "") {
      navigate(`/search?q=${searchText.trim()}`);
      setSearchText("");
    }
  };

  const handleLogout = async () => {
    await axios.post("/logout");
    setUserData(null);
    setIsLoggedIn(false);
    setAccountToggle(false);
    <Navigate to={"/"} />;
  };

  return (
    <div className="bg-black text-white flex justify-between items-center z-10 px-3 py-2 sticky top-0 w-full md:px-4 lg:px-8 lg:py-0">
      <div className="h-10 w-10 md:h-20 md:w-20 lg:h-20 lg:w-20 ">
        <Link to="/">
          <img src={logo} alt="" className="h-full w-full object-cover" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="gap-10 hidden md:flex  lg:gap-20  lg:ml-20">
          <Menu handleMenuToggle={handleMenuToggle} />
        </div>
        <div className="md:hidden">
          <RxHamburgerMenu
            className="cursor-pointer"
            onClick={handleMenuToggle}
          />
        </div>
        {menuToggle && (
          <div className="flex justify-between absolute right-0 px-5 py-2 w-full h-full bg-black items-center md:hidden">
            <Menu handleMenuToggle={handleMenuToggle} />
            <RxCross2
              className="mr-2 text-red-200 text-xl"
              onClick={handleMenuToggle}
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 justify-center">
        <form
          className="flex items-center bg-gray-100 rounded-lg px-2 py-0.5 text-black w-4/5 md:py-1 lg:w-2/5 "
          onSubmit={handleSearch}
        >
          <input
            type="search"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full placeholder-black"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <AiOutlineSearch className="text-gray-500" />
        </form>
      </div>
      {isLoggedIn ? (
        <>
          <div className="h-10 w-10" onClick={handleAccountButton}>
            <img
              src={`http://localhost:4001/uploads/${userData?.photo}`}
              className="h-full w-full object-cover rounded-full cursor-pointer"
              alt="user profile pic"
            />
          </div>
          {accountToggle && (
            <div className="bg-black h-32 text-center flex flex-col justify-evenly px-4 py-2 absolute top-full right-0 text-sm md:text-md lg:text-md">
              <Link
                to="/watchlist"
                className="border-b border-red-500"
                onClick={() => setAccountToggle(false)}
              >
                Watchlist
              </Link>

              <Link
                to="/favourite"
                className="border-b border-red-500"
                onClick={() => setAccountToggle(false)}
              >
                Liked Movies
              </Link>
              <p classname="cursor-pointer" onClick={handleLogout}>
                Logout
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="bg-red-500 text-white px-1.5 py-1 text-sm md:px-2 md:py-1 md:text-base  rounded-sm">
          <Link to="/registerlogin">Sign in</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
