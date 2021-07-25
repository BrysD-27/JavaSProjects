import React from 'react';
import { useState } from 'react';

const DarkMode = () => {
    const [useDarkMode, setUseDarkMode] = useState(false);
    return <div className={useDarkMode ? "dark-mode dark" : "dark-mode light"}>
    <h1>Dark Mode</h1>
    <label>
        <input type="checkbox"
        onChange={() => {
        let nextValue = !useDarkMode;
        setUseDarkMode(nextValue); 
         }} />
        <span style={{marginLeft: '8px'}}>Use dark Mode?</span>
    </label>
  </div>
}

export default DarkMode;