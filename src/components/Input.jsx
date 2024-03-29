import React from 'react'
import Img from "../assets/images/photo.png";
import Attach from "../assets/images/attach.png";


const Input = () => {
  return (
    <div className='input'>
      <input type='text' placeholder='Message...' />
      <div className='send'>
        <img src={Attach} alt="" />
        <input type='file' style={{ display: "none" }} id='file' />
        <label htmlFor='file'>
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input