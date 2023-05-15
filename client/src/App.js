import React from 'react';
import styles from'./App.module.css';
import GridGallery from './components/gridGallery/gridGallery';
import MenuBar from './components/menuBar/menuBar';

const App = () => {

  return (
    <div className={styles.container}>
      <MenuBar />
      <GridGallery />
    </div>
  );
};

export default App;
