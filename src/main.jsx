import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import "./styles/main-styles.css"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from './context/UserContext';
import { ChatContextProvider } from './context/ChatContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <React.StrictMode>
      <ToastContainer />
      <ChatContextProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ChatContextProvider>
    </React.StrictMode>
  </AuthContextProvider>
);
