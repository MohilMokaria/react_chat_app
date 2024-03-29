import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { toast } from 'react-toastify';

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Message</span>
      <div className='user'>
        <img src="" alt="" />
        <span>Mohil</span>
        <button onClick={() => {
          signOut(auth);
          toast.success("User Logged Out!");
        }}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar