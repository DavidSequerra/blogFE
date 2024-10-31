import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

import CurrentUserCtx from '../../context/currentUser';

import styles from './SideBar.module.css'



function SideBar() {
  const userId = localStorage.getItem("USER_ID");
  const navigate = useNavigate();
  const { currentUser} = useContext(CurrentUserCtx);
  const [blogsList, setBlogsList] = useState([]);
  const [followsList, setFollowsList] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/blogs/list/${userId}`);
      setBlogsList(response.data.slice(0,5));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFollows = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/follows/list/${userId}`);
      setFollowsList(response.data.slice(0,5));
    } catch (error) {
      console.error(error);
    }
  };

  const snipNavigator = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    fetchBlogs();
    fetchFollows();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])


  return (
    <div className={styles.sideBarWrapper}>
      <div className={styles.sectionsWrapper}>
        <div className={styles.title}>Username {currentUser.username}</div>
        <ul className={styles.listedItems}>
          <li onClick={() => snipNavigator('/profile')}><p>Profile</p></li>
          <li onClick={() => snipNavigator('/blogs')}><p>Blogs</p></li>
          <li onClick={() => snipNavigator('/feed')}><p>Feed</p></li>
        </ul>
      </div>
      {blogsList.length > 0 &&
        <div className={styles.sectionsWrapper}>
          <div className={styles.title}>My blogs</div>
          <ul className={styles.listedItems}>
            {blogsList.map(blog => (
              <li key={blog.blog_id} onClick={() => snipNavigator(`/feed/${blog.blog_id}`)}><p>{blog.title}</p></li>
            ))}
          </ul>
        </div>
      }
      {followsList.length > 0 && 
        <div className={styles.sectionsWrapper}>
        <div className={styles.title}>Following blogs</div>
        <ul className={styles.listedItems}>
            {followsList.map(blog => (
              <li key={blog.follow_id} onClick={() => snipNavigator(`/feed/${blog.blog_id}`)}><p>{blog.title}</p></li>
            ))}
        </ul>
      </div>
      }
    </div>
  )
}

export default SideBar