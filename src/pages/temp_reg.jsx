import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const displayName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

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
      navigate("/");

    } catch (error) {
      console.error("Error during registration:", error);
      setErr(true);
    }
  };

  return (
    
      <div className='formContainer'>
        <div className='formWrapper'>
          <span className='logo'>Message</span>
          <span className='title'>Create New Account</span>
          <form onSubmit={handleSubmit}>
            <input type='file' />
            <input type='text' placeholder='Display Name' />
            <input type='email' placeholder='Your Email' />
            <input type='password' placeholder='New Password' />
            <button>Sign-up</button>
            {err && <span>Something Went Wrong!</span>}
          </form>
          <p><Link to="/login">Login Instead..?</Link></p>
        </div>
      </div>
    
  )
}

export default Register;
