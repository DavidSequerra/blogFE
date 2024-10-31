import React from 'react';
import Signup from '../components/homePageOut/SignUp';
import LogIn from '../components/homePageOut/LogIn';

import styles from './HomePageOut.module.css'

function HomePageOut() {
  return (
    <div className={styles.paddingT3r}>
      <div>
        <h1>Welcome to Blogger</h1>
        <br></br>
        <h3>Share your experiences, your daily routine or get to connect to millions of others about to discuss your favorites subjects</h3>
      </div>
      <br></br><br></br>
      <div className={styles.logSignWrapper}>
        <div className={styles.logSignBox}>
          <LogIn/>
        </div>
        <div className={styles.logSignBox}>
          <Signup/>
        </div>
      </div>
    </div>
  )
}

export default HomePageOut