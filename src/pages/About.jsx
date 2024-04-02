import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div id="profile-div">
      <div className="card-body d-flex flex-column my-card-profile">
      <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-control-profile"
            id="contact"
            placeholder="Contact"
            value="mmokaria948@rku.ac.in"
            readOnly
          />
          <label htmlFor="appVersion" className="my-form-label my-form-label-profile">Contact</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-control-profile"
            id="appName"
            placeholder="Project Name"
            value="Message"
            readOnly
          />
          <label htmlFor="appName" className="my-form-label my-form-label-profile">App Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-control-profile"
            id="appVersion"
            placeholder="App Version"
            value="1.0.0"
            readOnly
          />
          <label htmlFor="appVersion" className="my-form-label my-form-label-profile">Version</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-control-profile"
            id="appDescription"
            placeholder="App Description"
            value="Mokaria Mohil Navinbhai"
            readOnly
          />
          <label htmlFor="appDescription" className="my-form-label my-form-label-profile">Developer</label>
        </div>
      </div>
    </div>
  );
};

export default About;
