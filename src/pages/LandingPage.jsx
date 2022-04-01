import React from 'react'
import { Link } from 'react-router-dom';
import "../index.css"

function LandingPage() {
  return (
    <div className="landing_page_container">
      <div className="landing_page_container_left">
        <span className="h2 fw-bold">
          <sapn className="text-primary">Dash </sapn>Notes
        </span>
        <div className="flex flex-col">
          <span className="h3 fw-semibold">Tame your work,</span>
          <span className="h3 fw-semibold text-primary">organize your life</span>
          <p className="h4">
            Remember everything and tackle any project with your notes all in one place.
          </p>
        </div>
        <div className="flex flex-col">
          <Link to="/signup">
            <button className="btn btn_primary fw-semibold">Join Now</button>
          </Link>
          <Link to="login" className="text-primary">
            Already have an account?
          </Link>
        </div>
      </div>
      <div className="landing_page_container_right">
        <img className="landing_page_hero" src="assets/notes-cuate.png"></img>
      </div>
    </div>
  );
}

export default LandingPage