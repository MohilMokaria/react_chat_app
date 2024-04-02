import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  let loadMessageCount = 20;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMessagesCount, setLoadedMessagesCount] = useState(loadMessageCount);
  const { data } = useContext(ChatContext);
  const messagesEndRef = useRef(null);
  const isFirstLoad = useRef(true);

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
    if (isFirstLoad.current || loadedMessagesCount === loadMessageCount) {
      scrollToBottom();
      isFirstLoad.current = false;
    }
  }, [messages, loadedMessagesCount]);

  const scrollToBottom = () => {
    if (isFirstLoad.current || loadedMessagesCount === loadMessageCount) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const loadMoreMessages = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLoadedMessagesCount(prevCount => prevCount + loadMessageCount);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="chat-box-home">
      {isLoading && <div>Loading...</div>}
      {!isLoading && loadedMessagesCount < messages.length && (
        <button className='btn btn-outline-info mb-2' onClick={loadMoreMessages}>Load Previous</button>
      )}
      {messages.slice(Math.max(messages.length - loadedMessagesCount, 0)).map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;