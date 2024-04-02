import React, { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const ChatHeader = () => {
    const { data, dispatch } = useContext(ChatContext);

    const handleCloseChat = () => {
        dispatch({ type: "CLOSE_CHAT" });
    };

    return (
        <div className="my-chat-header d-flex justify-content-between">
            <div className="d-flex align-items-center">
                <img
                    src={data.user.photoURL}
                    className="profile-pic-home"
                    alt="Profile Picture"
                />
                <span className="my-chat-user-name-home">{data.user.displayName}</span>
            </div>
            <div className="d-flex gap-1">
                <button className="btn my-close-button my-button-home" onClick={handleCloseChat}>
                    <span className="material-symbols-outlined my-chat-icon">
                        close
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
