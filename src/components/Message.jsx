import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message]);

  return (
    <div className={message.senderId == currentUser.uid ? "me" : "other"}>
      {message.img && <img className='message-img' src={message.img} />}
      <p className='message-content'>{message.text}</p>
      <span className='message-status'>{message.date.toDate().toLocaleString()}</span>
    </div>
  )
}

export default Message