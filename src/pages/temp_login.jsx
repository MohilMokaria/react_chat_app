import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {

      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

    } catch (error) {
      console.error("Error during login:", error);
      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Message</span>
        <span className='title'>Login to Account</span>
        <form onSubmit={handleLogin}>
          <input type='email' placeholder='Registered Email' />
          <input type='password' placeholder='Your Password' />
          <button>Sign-in</button>
          {err && <span>Something Went Wrong!</span>}
        </form>
        <p><Link to="/register">Register Insted..?</Link></p>
      </div>
    </div>
  )
}

export default Login