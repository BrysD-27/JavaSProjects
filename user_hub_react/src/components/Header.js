import React, { useState } from 'react';

import './Header.css';

const Header = ({
  currentUser,
  setCurrentUser,
  userList 
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleSelectChange = (event) => {

  }

  const handleUserLogin = (event) => {

  }

  const handleUserLogout = (event) => {

  }

  return (
    <header>
      <h1>Welcome to UserHub</h1>
      <form 
        className="user-select" 
        onSubmit={ handleSubmit } >
        {
          currentUser
          ? <button onClick={ handleUserLogout }>LOG OUT</button>
          : <>
              <select onChange={ handleSelectChange }>{
                userList.map(user => (
                  <option key={ user.id } value={ user.id }>
                    { user.username }
                  </option>
                ))
              }</select>
              <button onClick={ handleUserLogin }>LOG IN</button>
            </>
        }
      </form>
    </header>
  );
}

export default Header;