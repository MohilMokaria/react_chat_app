import React, { useContext, useRef, useState } from "react";
import { AuthContext } from '../context/AuthContext';
import { sendPasswordResetEmail, signOut, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { toast } from 'react-toastify';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [imageURL, setImageURL] = useState(currentUser.photoURL);
  const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, currentUser.displayName);
    try {
      setLoading(true);
      const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      const updatedImageURL = `${downloadURL}?${new Date().getTime()}`;
      setImageURL(updatedImageURL);
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile picture!");
    }
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);
    const email = currentUser.email;

    await sendPasswordResetEmail(auth, email)
      .then((data) => {
        setLoading(false);
        toast.success("Password Reset Mail Sent to " + email);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div id="profile-div">
    {loading && (
        <div className="loading-overlay">
          <div>Please Wait...</div>
        </div>
      )}
      <div className="card-body d-flex flex-column my-card-profile">
        <img
          className="avatar-profile"
          src={imageURL}
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
            type="email"
            className="form-control form-control-profile"
            id="floatingInput"
            placeholder="Your Email"
            name="mail"
            value={currentUser.displayName}
            readOnly
          />
          <label htmlFor="floatingInput" className="my-form-label my-form-label-profile">Your User Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control form-control-profile"
            id="floatingInput"
            placeholder="Your Email"
            name="mail"
            value={currentUser.email}
            readOnly
          />
          <label htmlFor="floatingInput" className="my-form-label my-form-label-profile">Your Email</label>
        </div>

        <button className="btn btn-profile btn-outline-primary" onClick={handleReset}>Reset Password</button>
        <button onClick={() => {
          signOut(auth);
          toast.info("User Logged Out!");
        }} className="btn btn-profile btn-outline-danger">Logout</button>
      </div>
    </div>
  );
};

export default Profile;