import React from "react";
import { RxCaretDown } from "react-icons/rx";
import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <>
      <Link to="/movies" onClick={props.handleMenuToggle}>
        Movies
      </Link>
      <Link to="/tvshows" onClick={props.handleMenuToggle}>
        TV Series
      </Link>
    </>
  );
};

export default Menu;
