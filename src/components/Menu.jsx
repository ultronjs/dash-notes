import React,{ useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import {AiOutlineHome,MdLabelOutline,BsArchive,FiTrash,CgProfile,VscSignOut} from "../icons"
import { useAuth } from '../context'

function Menu() {
  const navigate = useNavigate()
  const {signInStatusDispatch} = useAuth()
  const logOut = () => {
    localStorage.removeItem("token");
    signInStatusDispatch({ type: "SIGN_OUT" });
    navigate("/")
  };
  return (
    <div className="menu flex flex-col flex-jc-space-between mb-small">
      <div className="flex flex-col">
        <NavLink
          className="link_wrapper menu_item flex flex-ai-center fs-m"
          to="/home"
        >
          <AiOutlineHome />
          <span>Home</span>
        </NavLink>
        <NavLink
          className="link_wrapper menu_item flex flex-ai-center fs-m"
          to="/labels"
        >
          <MdLabelOutline />
          Label
        </NavLink>
        <NavLink
          className="link_wrapper menu_item flex flex-ai-center fs-m"
          to="/archive"
        >
          <BsArchive />
          Archive
        </NavLink>
        <NavLink
          className="link_wrapper menu_item flex flex-ai-center fs-m"
          to="/trash"
        >
          <FiTrash />
          Trash
        </NavLink>
        <NavLink
          className="link_wrapper menu_item flex flex-ai-center fs-m"
          to="/profile"
        >
          <CgProfile />
          Profile
        </NavLink>
      </div>
      <div className="user_name_container flex flex-jc-space-between">
        <div className="flex flex-col">
          <span>Swapnil Bansal</span>
          <span className="text-primary">@swapnilbansal</span>
        </div>

        <VscSignOut size={30} onClick={logOut} />
      </div>
    </div>
  );
}

export default Menu