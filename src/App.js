import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Navigation, Home, Fretboard, MusicTheory, NotFound } from './components/';
import languages from './languages/languages.json';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  const setValueInLocalStorage = (newValue) => {
    setValue((currentValue) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    })
  }
  return [value, setValueInLocalStorage];
}

export default function App() {

  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const [lang, setLang] = useLocalStorage('lang', 'en');
  const [l, setL] = useState(languages[lang]);
  const [currNavEl, setCurrNavEl] = useState('home');

  useEffect(() => {
    setL(languages[lang]);
  }, [lang]);

  return (
    <HelmetProvider>
      <Router>

        <Helmet>
          <body data-theme={theme} />
        </Helmet>

        <Navigation
          currNavEl={l.str[currNavEl]}
          invertColor={() => setTheme(cur => cur === 'light' ? 'dark' : 'light')}
          changeSelNavIcon={(navEl) => setCurrNavEl(navEl)} 
          changeLang={() => setLang(cur => cur === 'en' ? 'de' : 'en')} 
          lang={l} />

        <Switch>
          <Route path={'/'} exact render={(props) => (
            <Home {...props} changeSelNavIcon={(navEl) => setCurrNavEl(navEl)} lang={l}/>
          )} />
          <Route path='/music-theory' render={(props) => (
            <MusicTheory {...props} changeSelNavIcon={(navEl) => setCurrNavEl(navEl)} lang={l} />
          )} />
          <Route path='/fretboard' render={(props) => (
            <Fretboard {...props} changeSelNavIcon={(navEl) => setCurrNavEl(navEl)} lang={l} />
          )} />
          <Route path='*'>
            <NotFound lang={l} />
          </Route>
        </Switch>
      </Router>
    </HelmetProvider>
  );
}