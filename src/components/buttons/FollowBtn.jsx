import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CurrentUserCtx from '../../context/currentUser';

import styles from './FollowBtn.module.css';

function FollowBtn({ userId, blogId }) {
    const { setCurrentUser } = useContext(CurrentUserCtx);
    const [userHasFollow, setUserHasFollow] = useState(false);
     const fetchFollow = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/follows/${userId}/${blogId}`);
            if (response.data.length > 0) {
                setUserHasFollow(true)
            } else {
                setUserHasFollow(false)
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFollow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const postFollow = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/follows/${userId}/${blogId}`);
            if (response) {
                fetchFollow();
                setCurrentUser(prev => ({
                    ...prev,
                    change: prev.change + 1
                }))
            };
        } catch (error) {
            console.error(error);
        }
    }

  return (
      <div className={styles.divFollow}>
          <button onClick={postFollow} className={styles.followButton} >
              {userHasFollow ? <span className={styles.yellowStar}></span> : <span className={styles.whiteStar}></span>}
          </button>
    </div>
  )
}

export default FollowBtn