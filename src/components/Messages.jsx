import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMessagesCount, setLoadedMessagesCount] = useState(10);
  const { data } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMoreMessages = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLoadedMessagesCount(prevCount => prevCount + 10);
      setIsLoading(false);
      scrollToBottom(); // Scroll to bottom after loading more messages
    }, 1000);
  };

  return (
    <div className="chat-box-home">
      {isLoading && <div>Loading...</div>}
      {!isLoading && loadedMessagesCount < messages.length && (
        <button onClick={loadMoreMessages}>Load Previous</button>
      )}
      {messages.slice(Math.max(messages.length - loadedMessagesCount, 0)).map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;