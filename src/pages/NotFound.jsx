import React from 'react'
import Nav from "../components/Nav"
import { Link } from 'react-router-dom';
import "../index.css"

function NotFound() {
  return (
    <div className="empty_container flex flex-col flex-center">
      <Nav />
      <img className="not_found_image" src="/assets/404.png" alt="404" />
      <Link to="/home">
        <button className="btn btn_primary_outline">Go to Home</button>
      </Link>
    </div>
  );
}
export default NotFound