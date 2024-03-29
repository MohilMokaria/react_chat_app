import React from 'react'
import Messages from './Messages'
import Input from './Input'

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>Mohil</span>
        <div className='chatIcons'>
          <button>Delete Chat</button>
          <button>Close Chat</button>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  )
}

export default Chat