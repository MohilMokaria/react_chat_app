import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { db } from "../firebase";
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { ChatContext } from '../context/ChatContext';


const Chats = () => {

  const { user, setUser } = useUser();
  const { currentUser } = useContext(AuthContext);
  const { dispatch, data: chatData } = useContext(ChatContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchSelect = async () => {
    setLoading(true);
    if (currentUser && user) {
      if (currentUser.uid === user.uid) {
        toast.warning("Can't Message Your Self");
        return;
      }
      const combinedId = (currentUser.uid > user.uid) ? (currentUser.uid + user.uid) : (user.uid + currentUser.uid);
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
        if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            [combinedId + ".date"]: serverTimestamp()
          });

          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            },
            [combinedId + ".date"]: serverTimestamp()
          });
          toast.success("Chat created with " + user.displayName);
          dispatch({ type: "CHANGE_USER", payload: user });
        }
      } catch (err) {
        console.error(err);
        toast.error("Something Went Wrong!");
      }
      setUser(null);
    } else {
      toast.error("User Null!");
    }
    setLoading(false);
  }

  useEffect(() => {
    const getChats = () => {
      if (currentUser.uid) {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data())
        });

        return () => {
          unsub();
        };
      }
    };

    getChats();
  }, [currentUser.uid])


  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  }

  return (
    <div className="chat-content-home">
      {loading && (
        <div className="loading-overlay">
          <div>Please Wait...</div>
        </div>
      )}
      {user && (
        <div onClick={handleSearchSelect}>
          <div className="chat">
            <img
              src={user.photoURL}
              className="profile-pic-home"
              alt="Profile Picture"
            />
            <span className="seach-name-home">{user.displayName}</span>
          </div>
          <hr className='search-hr'></hr>
        </div>
      )}

      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div className="chat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img
            src={chat[1].userInfo.photoURL}
            className="profile-pic-home"
            alt="Profile Picture"
          />
          <div className='user-info-chat'>
            <p className="user-name-home">{chat[1].userInfo.displayName}</p>
            <p className='user-msg-home'>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Chats