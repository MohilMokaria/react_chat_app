import React from 'react'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const profile = () => {
    navigate("/profile");
    return;
  }
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <h5 className="navbar-brand me-auto">Message</h5>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Message</h5>
            <button
              type="button"
              className="btn-close my-button-home"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul
              className="navbar-nav justify-content-center flex-grow-1 pe-3 my-toggle-menu"
            >
              <li className="nav-item profile-navbar">
                <button
                  onClick={profile}
                  className="nav-link mx-lg-2 mitem my-button-home"
                >
                  <div className="d-flex gap-1">
                    <span className="material-symbols-outlined my-nav-icons">
                      person_book
                    </span>
                    <div>My Profile</div>
                  </div>
                </button>
              </li>
              <hr className="nav-hr" />
              <li className="nav-item">
                <button className="nav-link mx-lg-2 mitem" onClick={() => {
                  navigate("/about");
                  return;
                }}>
                  <div className="d-flex gap-2">
                    <span className="material-symbols-outlined my-nav-icons">
                      chat
                    </span>
                    <div>Contact Dev</div>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={profile}
          className="profile-button my-button-home">
          <div className="d-flex gap-1">
            <span className="material-symbols-outlined my-nav-icons">
              person_book
            </span>
            <div>My Profile</div>
          </div>
        </button>
        <button
          className="navbar-toggler pe-0 my-button-home"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar