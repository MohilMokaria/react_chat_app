import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();


export const ChatContextProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
        isChatOpen: false
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                const { payload } = action;
                const chatId = (currentUser.uid > payload.uid) ? (currentUser.uid + payload.uid) : (payload.uid + currentUser.uid);
                return {
                    user: payload,
                    chatId: chatId,
                    isChatOpen: true
                };
            case "CLOSE_CHAT":
                return {
                    ...state,
                    chatId: null,
                    user: {},
                    isChatOpen: false
                };
            default:
                return state;
        }
    }
    

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};
