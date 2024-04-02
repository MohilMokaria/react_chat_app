import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDocs, setDoc, where, query, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import profilePic from "../assets/user.jpg";


const Register = () => {
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
      toast.error("Select a Profile Picture!");
      setLoading(false);
      return;
    }

    if (!displayName) {
      toast.error("Enter Display Name!");
      setLoading(false);
      return;
    }

    if (!isEmail(email)) {
      toast.error("Enter Valid Email!");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Atlest 6 Characters Password Required!");
      setLoading(false);
      return;
    }

    try {

      const displayNameExists = await checkDisplayNameExists(displayName);
      if (displayNameExists) {
        throw new Error('The display name is already in use. Please choose a different one.');
      }

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
      if (error.code === "auth/email-already-in-use") {
        toast.error("The email is already in use. Please try a different email.");
      }else{
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  const checkDisplayNameExists = async (displayName) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("displayName", "==", displayName));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking display name:", error);
      return false;
    }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isEmail(email)) {
      toast.error("Enter Valid Email!");
      setLoading(false);
      return;
    }

    if (!password) {
      toast.error("Password Required to Login!");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("Logged in as "+email);
      navigate("/");

    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid Login Credentials!");
      }else{
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    const email = document.getElementById("login-email").value;
    if (!email) {
      setLoading(false);
      return toast.error("Enter Email to Reset Password!");
    }
    if (!isEmail(email)) {
      setLoading(false);
      return toast.error("Enter a valid email address!");
    }
    await sendPasswordResetEmail(auth, email)
      .then((data) => {
        setLoading(false);
        toast.success("Password Reset Mail Sent to " + email);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
    toast.warning("Make Sure " + email + " is Valid");
  };


  return (
    <div id='signup-div'>
      {loading && (
        <div className="loading-overlay">
          <div>Please Wait...</div>
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
