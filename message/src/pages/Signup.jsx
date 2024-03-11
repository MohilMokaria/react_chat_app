import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validator = (e) => {

      navigate("/home");
      return;

        // e.preventDefault();

        // var emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    
        // if (!emailRegex.test(formData.email)) {
        //     toast.error("Invalid Email !");
        //     return;
        // }
    
        // if (formData.password !== formData.confirmPassword) {
        //     toast.error("Password Doesn't Match ! Try Again");
        //     return;
        // }
    
        // if (formData.password.length < 6 || formData.confirmPassword.length > 12) {
        //     toast.error("Password must be 6 to 12 characters long !");
        //     return;
        // }

        // // Backend API call to put here
        // toast.success("Registration Complete")
        // navigate("/home");
        // return;
    }

    return (
      <div id='signup-div'>
        <div className="card-body d-flex flex-column my-card-signup">
        <ul
          className="nav nav-pills mb-3 d-flex justify-content-center my-pills-list my-pills-list-signup"
          id="pills-tab"
          role="tablist"
        >
          <div className="d-flex gap-3">
            <li className="nav-item myPill" role="presentation">
              <button
                className="nav-link active my-pills-button my-pills-button-signup"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Sign-up
              </button>
            </li>
            <li className="nav-item myPill" role="presentation">
              <button
                className="nav-link my-pills-button my-pills-button-signup"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Login
              </button>
            </li>
          </div>
        </ul>
  
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            <form id="signup-form" className="my-form my-form-signup" onSubmit={validator}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control form-control-signup"
                  id="signup-email"
                  placeholder="Your Email"
                  name="email"
                  
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="signup-email" className="my-form-label my-form-label-signup">
                  Your Email
                </label>
              </div>
  
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control form-control-signup"
                  id="signup-password"
                  placeholder="New Password"
                  name="password"
                  
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label htmlFor="signup-password" className="my-form-label my-form-label-signup">
                  New Password
                </label>
              </div>
  
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control form-control-signup"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  
                />
                <label htmlFor="confirm-password" className="my-form-label my-form-label-signup">
                  Confirm Password
                </label>
              </div>
  
              <div className="my-btn-div-signup">
                <button type="submit" className="btn btn-primary submit-btn-signup">
                  Sign-up
                </button>
              </div>
            </form>
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            <form id="login-form" className="my-form my-form-signup" onSubmit={validator}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control form-control-signup"
                  id="login-email"
                  placeholder="Registered Email"
                  name="email"
                  
                />
                <label htmlFor="login-email" className="my-form-label my-form-label-signup">
                  Registered Email
                </label>
              </div>
  
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control form-control-signup"
                  id="login-password"
                  placeholder="Account Password"
                  name="password"
                  
                />
                <label htmlFor="login-password" className="my-form-label my-form-label-signup">
                  Account Password
                </label>
              </div>
  
              <div className="my-btn-div-signup">
                <button type="submit" className="btn btn-primary submit-btn-signup">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default Signup;
