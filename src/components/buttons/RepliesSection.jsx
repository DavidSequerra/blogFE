import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReplyBtn from './ReplyBtn';
import LikeBtn from './LikeBtn';
import UserCard from '../userCard/UserCard';
import DeleteBtn from './DeleteBtn';

import styles from './RepliesSection.module.css';

function RepliesSection({ postId, userId, replyCount }) {
  const [showReplies, setShowReplies] = useState(false); 
  const [replies, setReplies] = useState([]); 
  const [secondRepliesVisibility, setSecondRepliesVisibility] = useState({}); 
  const [secondRepliesData, setSecondRepliesData] = useState({}); 

  const fetchReplies = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/replies/${postId}`);
      setReplies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReplies()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replyCount])
  
  const fetchSecondReplies = async (replyId) => {
    try {
      const response = await axios.get(`http://localhost:3001/replies/replyId/${replyId}`);
      console.log(response.data)
      setSecondRepliesData(prevData => ({
        ...prevData,
        [replyId]: response.data
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReplies = () => {
    if (!showReplies) {
      fetchReplies(); 
    }
    setShowReplies(!showReplies); 
    console.log(replies)
  };
  const toggleSecondReplies = (replyId) => {
    setSecondRepliesVisibility(prevVisibility => {
      const isVisible = !prevVisibility[replyId]; 
      if (isVisible && !secondRepliesData[replyId]) {
        fetchSecondReplies(replyId); 
      }
      return { ...prevVisibility, [replyId]: isVisible }; 
    });
  };

  const handleNewReply = (replyId = null) => {
    if (replyId) {
      setSecondRepliesData(prevData => ({
        ...prevData,
        [replyId]: []
      }));
      fetchSecondReplies(replyId);
      setSecondRepliesVisibility(prevVisibility => ({
        ...prevVisibility,
        [replyId]: true 
      }));
    } 
    fetchReplies();
  };
  const handleDeleteReply = (replyId = null) => {
    console.log(replyId);
    if (replyId) {
      setSecondRepliesData(prevData => ({
        ...prevData,
        [replyId]: []
      }));
      fetchSecondReplies(replyId); 
    } else {
      fetchReplies();
    }
  };

  return (
    <div className={styles.divWrapper}>
      <div className={styles.flexerRelative}>
        <div onClick={toggleReplies} className={styles.repliesToggle}>{replies.length} Replies</div>
        <ReplyBtn postId={postId} refreshParent={handleNewReply} />
      </div>
      {showReplies && replies.map(reply => (
        <div key={reply.reply_id}>
          <div className={styles.repliesWrapper}>
            <div>
              <UserCard username={reply.username} avatarClass={styles.replyUserAvatar} userImg={reply.img} />
            </div>
            <div className={styles.marginLAuto}>
              <ReplyBtn postId={postId} parentReplyId={reply.reply_id} refreshParent={() => handleNewReply(reply.reply_id)} />
            </div>
            <div className={styles.spanRedButtonSub}>
              <DeleteBtn
                className={styles.redButtonSub}
                userId={reply.user_id}
                type={'Reply'}
                typeId={reply.reply_id}
                refreshParent={()=> handleDeleteReply()}
              />
            </div>
            <div className={styles.width8r} onClick={() => toggleSecondReplies(reply.reply_id)}>
              {secondRepliesVisibility[reply.reply_id] ? 'Hide comments' : 'Show comments'}
            </div>
            <LikeBtn userId={userId} itemId={reply.reply_id} itemType="reply" />
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.paddingL3r}>{reply.content}</div>
          </div>

          {secondRepliesVisibility[reply.reply_id] &&
            <div className={styles.subRepliesWrapper}>
              {(secondRepliesData[reply.reply_id] && secondRepliesData[reply.reply_id].length === 0) ? (
                <div>No comments yet</div>
              ) : (
                <div>
                  {(secondRepliesData[reply.reply_id] || []).map(sReply => (
                    <div key={sReply.reply_id} className={`${styles.subReply} ${styles.flexerRelative}`}>
                      <div className={styles.contentWrapper}>
                        <div>
                          <UserCard username={sReply.username} avatarClass={styles.replyUserAvatar} userImg={sReply.img} />
                          <div className={styles.paddingL4r}>{sReply.content}</div>
                        </div>
                        <div className={styles.spanRedButtonSub}>
                          <DeleteBtn
                            className={styles.redButtonSub}
                            userId={sReply.user_id}
                            type={'Comment'}
                            typeId={sReply.reply_id}
                            refreshParent={() => handleDeleteReply(reply.reply_id)}
                          />
                        </div>
                      </div>
                      <LikeBtn userId={userId} itemId={sReply.reply_id} itemType="subReply" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          }
        </div>
      ))}
    </div>
  );
}

export default RepliesSection;
