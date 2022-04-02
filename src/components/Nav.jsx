import "../index.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="nav_left_side flex gap-s">
        <Link className="link_wrapper" to="/">
          <i className="fas fa-sticky-note fa-2x text-primary"></i>
          <span className="h3">
            <span className="text-primary">Dash</span>Notes
          </span>
        </Link>
      </div>
    </nav>
  );
}
