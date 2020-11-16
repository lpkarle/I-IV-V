import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navigation, Home, ChordsInKey, Fretboard, CircleOfFifths, MusicTheory, NotFound } from './components/';
import { LogoIcon, HomeIcon, MusicNoteIcon, MenuIcon, InvertColorIcon, MoreIcon } from './images/index';
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
    { icon: <MoreIcon />, onClick: () => console.log("Hello") },
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
            <Home {...props} elements={homeElements} onClick={(navEl) => console.log(navEl)} />
          )} />
          <Route path="/music-theory" component={MusicTheory} />
          <Route path="/fretboard" component={Fretboard} />

          <Route path="/music-theory/chords-in-key" component={ChordsInKey} />
          <Route path="/music-theory/circle-of-fifths" component={CircleOfFifths} />

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </HelmetProvider>
  );
}