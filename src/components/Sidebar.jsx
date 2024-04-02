import React from 'react';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <div className="section-left-home">
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
