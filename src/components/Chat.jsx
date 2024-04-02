import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import ChatHeader from './ChatHeader';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="section-right">
      {data.isChatOpen ? (
        <div className="my-chat-section">
          <ChatHeader />
          <Messages />
          <Input />
        </div>
      ) : (
        <h6 className="chat-empty-message">Open a chat</h6>
      )}
    </div>
  );
}

export default Chat 