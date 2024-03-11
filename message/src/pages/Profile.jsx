import profilePic from "../assets/profiles/2.png"
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();

  const signup = ()=>{
    navigate("/");
    return;
  }

  return (
    <div id="profile-div">
      <div className="card-body d-flex flex-column my-card-profile">
      <img
        src={profilePic}
        alt="Profile Picture"
        className="avatar-profile"
      />
      <button className="btn btn-profile btn-primary">Update Profile Picture</button>

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control form-control-profile"
          id="floatingInput"
          placeholder="Your Email"
          name="mail"
          value="monalisa@gmail.com"
          readOnly
        />
        <label htmlFor="floatingInput" className="my-form-label my-form-label-profile">Your Email</label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control form-control-profile"
          id="floatingInput"
          placeholder="Password"
          name="password"
          value="123456"
          readOnly
        />
        <label htmlFor="floatingInput" className="my-form-label my-form-label-profile">Password</label>
      </div>

      <button className="btn btn-profile btn-info">Update Password</button>
      <button onClick={signup} className="btn btn-profile btn-danger">Logout</button>
    </div>
    </div>
  )
}

export default Profile