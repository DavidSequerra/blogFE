import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './LikeBtn.module.css'

function LikeBtn({ userId, itemId, itemType }) {
    const [likes, setLikes] = useState(0);
    const [userHasLiked, setUserHasLiked] = useState(false);

    useEffect(() => {
        fetchLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemId]);

    const fetchLikes = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/likes/${itemType}/${itemId}`, {
                params: { userId }
            });
            setLikes(response.data.allLikes.length);
            if (response.data.userLike.length > 0) {
                setUserHasLiked(true);
            } else {
                setUserHasLiked(false)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const postLike = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/likes/postLike`, {
                userId,
                itemId,
                itemType
            });
            if (response) {
                fetchLikes();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className={styles.divWrapper}>
            {itemType === 'reply' ? (
                <button onClick={postLike} className={styles.replyButton}>
                    {likes}
                    {userHasLiked ? <span className={styles.redHeart}></span> : <span className={styles.whiteHeart}></span>}
                </button>
            ) : itemType === 'post' ? (
                    <button onClick={postLike} className={styles.postButton}>
                        {likes}
                        {userHasLiked ? <span className={styles.redHeart}></span> : <span className={styles.whiteHeart}></span>}
                    </button>
                ) : itemType === 'subReply' && (
                        <button onClick={postLike} className={styles.subReplyButton}>
                        {likes}
                            {userHasLiked ? <span className={styles.redHeart}></span> : <span className={styles.whiteHeart}></span>}
                    </button>
            )}
           
        </div>
        
    );
}

export default LikeBtn;
