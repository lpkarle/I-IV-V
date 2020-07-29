import React from 'react';

import styles from './App.module.css';
import { ChordsInKey } from './components/';

function App() {

  return (
    <div className={styles.container}>
      <h1>I-IV-V</h1>
      <ChordsInKey />
    </div>
  );
}

export default App;
