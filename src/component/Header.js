import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserCircle, FaAirbnb } from "react-icons/fa";
import axios from 'axios';
//style={{ position: 'fixed', top: 0 }}
const Header = () => {

  return (
    <header className="w-full">
      <nav className="bg-gray-200">
        <div className="w-full flex items-center justify-between" >
          <div className="flex items-center justify-between" >
            <FaAirbnb size={35} color="#ff385c" className="ml-5 mr-1 mt-3 mb-3" />
            <text className="font-bold mt-3 mb-4" style={{ color: '#ff385c', fontSize: 25, fontFamily: 'Georgia, serif' }}>airbnb</text>
          </div>
          <div >

          </div>
          <div>

          </div>
          <div>
            <button onClick={() => {
              window.location.replace('/profile');
            }} className="text-white mr-5 mt-3 mb-3"><FaUserCircle size={35} color="#ff385c" /></button>
            <button onClick={() => {
              sessionStorage.removeItem('@user');
              window.location.replace('/');
            }} className="mr-5 text-white mt-3 mb-3"><AiOutlineLogout size={35} color="#ff385c" /></button>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;