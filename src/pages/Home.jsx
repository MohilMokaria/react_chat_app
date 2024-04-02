import React, { useContext, useEffect, useState } from 'react'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { ChatContext } from '../context/ChatContext';

const Home = () => {

  const { data } = useContext(ChatContext);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="home-div">
      <Navbar />
      <div className="section-wrapper">
        {isMobileView ? (
          <div style={{display: data.isChatOpen ? 'none' : 'block', height:'100%'}}>
            <Sidebar />
          </div>
        ) : (
          <Sidebar display='block' />
        )}
        {isMobileView ? (
          <div style={{display : data.isChatOpen ? 'block' : 'none', height:'100%'}}>
            <Chat />
          </div>
        ) : (
          <Chat display='block' />
        )}
      </div>
    </div>
  );
}

export default Home