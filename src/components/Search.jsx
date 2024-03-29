import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Seach User'/>
      </div>
      <div className='userChat'>
        <img src="" alt=""/>
        <div className='userChatInfo'>
          <span>SEARCHED USER</span>
        </div>
      </div>
      <hr/>
    </div>
  )
}

export default Search