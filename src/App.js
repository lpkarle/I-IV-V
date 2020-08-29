import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navigation, Home, ChordsInKey, Fretboard, CircleOfFifths } from './components/';


/* Darkmode and Current NavItem*/
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  const setValueInLocalStorage = (newValue) => {
    setValue((currentValue) => {
      const result = typeof newValue === "function" ? newValue(currentValue) : newValue;
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    })
  }

  return [value, setValueInLocalStorage];
}


function App() {

  /* local storage to set theme and save the current tab/navElement */
  const [currNavEl, setCurrNavEl] = useLocalStorage("navElement", "Home");
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  // Navigation 
  /* const logoSVG = <svg width="100%" height="100%" viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><g><path d="M85.5,22.5c0,-11.59 -9.41,-21 -21,-21l-42,0c-11.59,0 -21,9.41 -21,21l0,42c0,11.59 9.41,21 21,21l42,0c11.59,0 21,-9.41 21,-21l0,-42Z" fill="none" stroke="#fff" stroke-width="3px" /><rect x="38.578" y="10.887" width="9.843" height="65.226" fill="#fff" fill-rule="nonzero" stroke="#fff" stroke-width="1px" stroke-linecap="butt" stroke-miterlimit="2" /></g></svg>*/  
  const moreSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>;  
  const homeSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/></svg>;
  const musicSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5v8.55c-.94-.54-2.1-.75-3.33-.32-1.34.48-2.37 1.67-2.61 3.07-.46 2.74 1.86 5.08 4.59 4.65 1.96-.31 3.35-2.11 3.35-4.1V7h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2c-1.1 0-2 .9-2 2z"/></svg>;
  const invertSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M24 0H0v24h24V0z" fill="none"/><path d="M6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58s4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31l-4.95-4.95c-.39-.39-1.02-.39-1.41 0L6.34 7.93zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"/></svg>;
  const fretboardSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"/></svg>;
  const helpSVG = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"/></svg>
  
  const topNavElements = [ 
    {icon: invertSVG, /* toggleTheme: setTheme(cur => cur === "light" ? "dark" : "light") */},
    {icon: moreSVG, },
  ];
  const sideNavElements = [ 
    {label: 'Home', icon: homeSVG, address: '/'}, 
    {label: 'Music Theory', icon: musicSVG, address: '/music-theory/chords-in-key'},
    {label: 'Fretboard', icon: fretboardSVG, address: '/fretboard'},
    {label: 'Help', icon: helpSVG, address: '/help'}
  ];

  return (
    <HelmetProvider>
      <Router>
        
          <Helmet>
            <body data-theme={theme} />
          </Helmet>
          
          <Navigation  
            topNavElements={topNavElements} 
            sideNavElements={sideNavElements}
            currNavEl={currNavEl}
            onClick={(navEl) => setCurrNavEl(navEl)}
            toggleTheme={()=> setTheme(cur => cur === "light" ? "dark" : "light")}/>            

          <Switch>
            <Route path={"/"} exact component={Home} />
            <Route path="/fretboard" component={Fretboard}/>
            <Route path="/music-theory/chords-in-key" component={ChordsInKey}/>
            <Route path="/music-theory/circle-of-fifths" component={CircleOfFifths}/>
          </Switch>
        
      </Router>
    </HelmetProvider>
  );
}

export default App;
