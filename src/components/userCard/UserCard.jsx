import React from 'react';

import styles from './UserCard.module.css'

function UserCard({ username, avatarClass, userImg }) {
  return (
    <div className={styles.cardWrapper}>
      <div className={avatarClass}><img src={userImg} alt='' className={styles.imgIcon} /></div>
      <div>{username}</div>
    </div>
  )
}

export default UserCard