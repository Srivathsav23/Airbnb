import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { CgLogOut } from "react-icons/cg";
const Header = () => {

  const onlogout = (e) => {
    let { history } = this.props
    sessionStorage.setItem("@user", false)
    history.push({ pathname: "/" });
    window.location.reload()
  }

  return (
    <header>
      <nav>
        <a onclick={onlogout} href="../login" className="text-white">LOG OUT</a>
      </nav>
    </header>
  );
};
export default Header;