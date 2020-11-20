import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navigation, Home, Fretboard, MusicTheory, NotFound } from './components/';
import { LogoIcon, HomeIcon, MusicNoteIcon, MenuIcon, InvertColorIcon, MoreIcon, HelpIcon, LanguageIcon } from './images/index';
import fretboard from './images/fretboard.jpeg';
import musicTheory from './images/notation.jpeg';
// import time from './images/time.jpg';
// import typewriter from './images/typewriter.jpg';

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

export default function App() {

  const topNavElements = [
    { icon: <InvertColorIcon />, onClick: () => setTheme(cur => cur === "light" ? "dark" : "light") },
    { icon: <MoreIcon />, onClick: () => console.log("more"), 
      dd: [{label: 'About', address: '/music-theory', icon: <HelpIcon/>},
           {label: 'Language', address: '/music-theory', icon: <LanguageIcon/>}]
    },
  ];
  const sideNavElements = [
    { label: 'Home', icon: <HomeIcon />, 
      address: '/', onClick: (el) => { setCurrNavEl(el) } },
    { label: 'Music Theory', icon: <MusicNoteIcon />, 
      address: '/music-theory', onClick: (el) => { setCurrNavEl(el) } },
    { label: 'Fretboard', icon: <MenuIcon />, 
      address: '/fretboard', onClick: (el) => { setCurrNavEl(el) } }
  ];

  const homeElements = [
    { address: '/music-theory', 
      img: musicTheory, 
      label: 'Music Theory', 
      text: 'Circle of Fifths & Chords in Key', 
      onClick: (el) => { setCurrNavEl(el) } },
    { address: '/fretboard', 
      img: fretboard, 
      label: 'Fretboard', 
      text: 'show chords and scales on fretboard', 
      onClick: (el) => { setCurrNavEl(el) } },
    // {address: '/metronom', img: time, label: 'Metronom', text: 'Rythm Practise', onClick: (el) => console.log(el)},
  ];

  const [currNavEl, setCurrNavEl] = useState(sideNavElements[0].label);
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  return (
    <HelmetProvider>
      <Router>

        <Helmet>
          <body data-theme={theme} />
        </Helmet>

        <Navigation
          logo={<LogoIcon />}
          topNavElements={topNavElements}
          sideNavElements={sideNavElements}
          currNavEl={currNavEl}
          onClick={(navEl) => setCurrNavEl(navEl)} />

        <Switch>
          <Route path={"/"} exact render={(props) => (
            <Home {...props} elements={homeElements} />
          )} />
          <Route path="/music-theory" render={(props) => (
            <MusicTheory {...props} changeSelNavIcon={(navEl) => setCurrNavEl(navEl)} />
          )} />
          <Route path="/fretboard" render={(props) => (
            <Fretboard {...props} changeSelNavIcon={(navEl) => setCurrNavEl(navEl)} />
          )} />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </HelmetProvider>
  );
}