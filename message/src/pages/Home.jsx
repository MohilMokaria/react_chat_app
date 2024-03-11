import a from "../assets/profiles/1.png"
import b from "../assets/profiles/2.png"
import c from "../assets/profiles/3.png"
import d from "../assets/profiles/4.png"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const profile = ()=>{
    navigate("/profile");
    return;
  }
  return (
    <div id="home-div">
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
              <li className="nav-item">
                <a className="nav-link mx-lg-2 mitem" aria-current="page" href="">
                  <div className="d-flex gap-1">
                    <span className="material-symbols-outlined my-nav-icons">
                      chat
                    </span>
                    <div>Chat</div>
                  </div>
                </a>
              </li>
              <hr className="nav-hr" />
              <li className="nav-item">
                <a className="nav-link mx-lg-2 mitem" href="">
                  <div className="d-flex gap-1">
                    <span className="material-symbols-outlined my-nav-icons">
                      contacts_product
                    </span>
                    <div>Contacts</div>
                  </div>
                </a>
              </li>
              <hr className="nav-hr" />
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
                <a className="nav-link mx-lg-2 mitem" href="">
                  <div className="d-flex gap-1">
                    <span className="material-symbols-outlined my-nav-icons">
                      bubble_chart
                    </span>
                    <div>About</div>
                  </div>
                </a>
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

    <div className="section-wrapper">
      <div className="section-left-home">
        <form className="d-flex finder" role="search">
          <input
            className="form-control finder-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <div className="chat-content-home">
          <div className="chat">
            <img
              src={a}
              className="profile-pic-home"
              alt="Profile Picture"
            />
            <span className="user-name-home">John Doe</span>
          </div>
          <div className="chat">
            <img
              src={b}
              className="profile-pic-home"
              alt="Profile Picture"
            />
            <span className="user-name-home">Emily Smith</span>
          </div>
          <div className="chat">
            <img
              src={c}
              className="profile-pic-home"
              alt="Profile Picture"
            />
            <span className="user-name-home">Michael Johnson</span>
          </div>
          <div className="chat">
            <img
              src={d}
              className="profile-pic-home"
              alt="Profile Picture"
            />
            <span className="user-name-home">David Miller</span>
          </div>

          
        </div>
      </div>

      <div className="section-right">
        <h6 className="chat-empty-message">Open a chat</h6>
        <div className="my-chat-section">
          <div className="my-chat-header d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={b}
                className="profile-pic-home"
                alt="Profile Picture"
              />
              <span className="my-chat-user-name-home">Emily Smith</span>
            </div>
            <div className="d-flex gap-1">
              <button className="btn my-delete-button my-button-home">
                <span className="material-symbols-outlined my-chat-icon">
                  delete
                </span>
              </button>
              <button className="btn my-close-button my-button-home">
                <span className="material-symbols-outlined my-chat-icon">
                  close
                </span>
              </button>
            </div>
          </div>
          <div className="chat-box-home"></div>
          <div className="d-flex my-chat-footer">
            <div className="d-flex finder justify-content-between">
              <input
                className="form-control finder-input my-chat-input"
                type="text"
                placeholder="Message..."
              />
              <button
                className="btn my-chat-send my-button-home d-flex gap-1 justify-content-center align-items-center"
              >
                <span className="material-symbols-outlined"> send </span>
                <div className="my-send-text">Send</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home