import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { SiChinaeasternairlines } from "react-icons/si";
//style={{ position: 'fixed', top: 0 }}
const Header = () => {

  return (
    <header className="w-full">
      <nav>
        <div className="w-full flex items-center justify-between" >
          <div className="flex items-center justify-between" >
            <SiChinaeasternairlines size={35} color="#87CEEB" className="ml-5 mr-1 mt-3 mb-3" />
            <text className="font-bold mt-3 mb-4" style={{ color: '#87CEEB', fontSize: 25, fontFamily: 'Georgia, serif' }}>gasVigilance</text>
          </div>
          <div >

          </div>
          <div>

          </div>
          <div>
            <button onClick={() => {
              window.location.replace('/profile');
            }} className="text-white mr-5 mt-3 mb-3"><FaUserCircle size={35} color="#87CEEB" /></button>
            <button onClick={() => {
              sessionStorage.removeItem('@user');
              window.location.replace('/');
            }} className="mr-5 text-white mt-3 mb-3"><AiOutlineLogout size={35} color="#87CEEB" /></button>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
