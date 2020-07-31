import React, { useState, useEffect } from 'react';

import styles from './App.module.css';
import { Navigation, ChordsInKey } from './components/';

function App() {

  const [selectedNavItem, setSelectedNavItem] = useState('Music Theory');

  // Navigation 
  const moreSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>;
  const topNavItems =[
    {icon: moreSVG}
  ];
  
  const homeSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/></svg>;
  const musicSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5v8.55c-.94-.54-2.1-.75-3.33-.32-1.34.48-2.37 1.67-2.61 3.07-.46 2.74 1.86 5.08 4.59 4.65 1.96-.31 3.35-2.11 3.35-4.1V7h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2c-1.1 0-2 .9-2 2z"/></svg>;
  const invertSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M24 0H0v24h24V0z" fill="none"/><path d="M6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58s4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31l-4.95-4.95c-.39-.39-1.02-.39-1.41 0L6.34 7.93zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"/></svg>;
  const logo = {icon: undefined, label: '-IV-V'};
  const sideNavItems = [ 
    {label: 'Home', icon: homeSVG, selected: false}, 
    {label: 'Music Theory', icon: musicSVG, selected: true},
    {label: 'Invert Color', icon: invertSVG, selected: false}
  ];

  function handleNavSelection(val) {
    console.log(val)
    setSelectedNavItem(val);
  }

  return (
    <div className={styles.container}>
      
      <Navigation logo={logo} 
                  topNavItems={topNavItems} 
                  sideNavItems={sideNavItems}
                  onClick={handleNavSelection}/>
        

      <div className={styles.content}>
                  
            {selectedNavItem === 'Music Theory'
            ? <ChordsInKey /> : null}
        
      </div>
 
    </div> 
  );
}

export default App;
