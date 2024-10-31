import React, { useContext } from 'react';
// import '../../styles/navbar.css';
import { useNavigate } from 'react-router-dom';

import CurrentUserCtx from '../../context/currentUser';

import SearchSideBar from './SearchNavbar';
import UserCard from '../userCard/UserCard';

import styles from './Navbar.module.css'

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserCtx);

  const handleLogOut = () => {
    navigate('/');
    setCurrentUser(null);
    localStorage.removeItem('USER_ID')
  }

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.shadowNav}></div>
      <div className={styles.flexerRelative}>
        <button className={styles.navSmallWrapper} onClick={() => navigate('/')}>Blogger</button>
        {currentUser && <SearchSideBar/>}
      </div>
      {currentUser &&
        <div className={`${styles.navSmallWrapper} ${styles.flexerRelative}`}>
          <UserCard username={currentUser.username} avatarClass={styles.navUserAvatar} userImg={currentUser.img} />
          <div className={styles.navLogOut}>
            <button className={`${styles.navSmallWrapper} ${styles.logOutButton}`} onClick={handleLogOut}>LogOut</button>
            <i className={`${'bi bi-box-arrow-right'} ${styles.iconOut}`}></i>
          </div>
        </div>
      }
    </div>
  )
}

export default Navbar