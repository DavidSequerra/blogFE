import React from 'react';
import SideBar from '../components/sideBar/SideBar';

// import '../styles/homePageOut.css';
import styles from './HomePage.module.css'



function HomePage() {
  return (
    <div>
      
      <div className={styles.navbarMarginned}>
        <SideBar />
      </div>
      
    </div>
  )
}

export default HomePage