import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import profilePic from "../assets/user.jpg";


const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(profilePic);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target[0].files[0];
    const displayName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    if (file == null) {
      toast.error("Image Not Selected!");
      setLoading(false);
      return;
    }

    if (!displayName) {
      toast.error("Enter Display Name!");
      setLoading(false);
      return;
    }

    if (!email) {
      toast.error("Invalid Email !");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password Should be Greater than 6 Characters!");
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);
      const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);

      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      setLoading(false);
      toast.success("Account Created!")
      navigate("/");

    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something Went Wrong!");
      setErr(true);
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Logged In!")
      navigate("/");

    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something Went Wrong!");
      setErr(true);
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    const email = document.getElementById("login-email").value;
    if (!email) {
      toast.error("Enter Email to Reset Password!");
    } else {
      toast.warning("Make Sure account with "+email+" exists");
      sendPasswordResetEmail(auth, email).then((data) => {
        toast.success("Sent Email to " + email);
      }).catch((error) => {
      toast.error(error);
      });
    }
    setLoading(false);
  }


  return (
    <div id='signup-div'>
      {loading && (
        <div className="loading-overlay">
          <div>Loading...</div>
        </div>
      )}
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
            <form id="signup-form" className="my-form my-form-signup" onSubmit={handleRegister}>
              <img
                className="avatar-profile"
                src={imageSrc}
                alt="Profile Pic"
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control form-control-signup"
                  id="user-name"
                  placeholder="Display Name"
                  name="displayName"
                />
                <label htmlFor="confirm-password" className="my-form-label my-form-label-signup">
                  Display Name
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control form-control-signup"
                  id="signup-email"
                  placeholder="Your Email"
                  name="email"
                  required
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
                />
                <label htmlFor="signup-password" className="my-form-label my-form-label-signup">
                  New Password
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
            <form id="login-form" className="my-form my-form-signup" onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control form-control-signup"
                  id="login-email"
                  placeholder="Registered Email"
                  name="email"
                  required
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
                  required
                />
                <label htmlFor="login-password" className="my-form-label my-form-label-signup">
                  Account Password
                </label>
              </div>

              <span className="forgot-password" onClick={handleReset}>Forgot Password ?</span>

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

  )
}

export default Register;
