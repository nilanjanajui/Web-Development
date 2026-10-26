import React from "react";
import dollerImg from "../../assets/dollar_1.png";

const Navbar = ({ coin }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm container mx-auto">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <button className="flex justify-between items-center gap-2 font-bold text-xl">
          {coin} Coins
          <img src={dollerImg} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
