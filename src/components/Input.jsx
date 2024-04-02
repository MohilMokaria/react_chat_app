import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { toast } from 'react-toastify';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fileInputRef.current = document.getElementById('file');
  }, []);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };
  const handleSend = async () => {
    setLoading(true);
    try {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTaskSnapshot = await uploadBytesResumable(storageRef, img);
        const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL
          })
        });

      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          })
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      toast.warning(err);
    }
    setText("");
    setImg(null);
    setLoading(false);
  }

  return (
    <div>
      <div className="d-flex my-chat-footer">
        <div className="d-flex finder justify-content-between">
          <input
            className="form-control finder-input my-chat-input"
            type="text"
            placeholder="Message..."
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            value={text}
            readOnly={loading}
          />

          <input
            className='my-chat-file'
            type='file'
            id="file"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />

          <button
            className="btn my-chat-attach my-button-home d-flex gap-1 justify-content-center align-items-center"
            onClick={handleButtonClick}
            disabled={loading}
          >
            <span className="material-symbols-outlined">
              add_photo_alternate
            </span>
          </button>

          <button
            className="btn my-chat-send my-button-home d-flex gap-1 justify-content-center align-items-center"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-grow spinner-grow-custom" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <span className="material-symbols-outlined"> send </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;