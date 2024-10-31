import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ProfileModal from '../components/profileModal/ProfileModal';
import PictureModal from '../components/profileModal/PictureModal';
import CurrentUserCtx from '../context/currentUser';
import SideBar from '../components/sideBar/SideBar';

import { useNavigate } from 'react-router-dom';

import styles from './ProfilePage.module.css';

function ProfilePage() {
  const userId = localStorage.getItem("USER_ID");
  const { currentUser, setCurrentUser } = useContext(CurrentUserCtx);
  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState([]);
  const [followsList, setFollowsList] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/blogs/list/${userId}`);
      setBlogsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFollows = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/follows/list/${userId}`);
      setFollowsList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchFollows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snipNavigator = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        try {
          const response = await axios.get(`http://localhost:3001/users/${userId}`);
          const data = response.data[0];
          setCurrentUser(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [currentUser, setCurrentUser, userId])

  return (
    <div className={styles.navbarMarginned}>
      <SideBar />
      <div className={styles.feedWrapper}>
        <div className={styles.limitDiv}>
          <PictureModal />
        </div>
        <h1>{currentUser.username}</h1>
        <h3>Bio: {currentUser.bio}</h3>
        <h4>Friends:</h4>
        <div className={styles.blogsSection}>
          <div>
            <div>Owned Blogs:</div>
            <ul className={styles.twoColumns}>
              {blogsList.length > 0 ? blogsList.map(blog => (
                <li key={blog.blog_id} onClick={() => snipNavigator(`/feed/${blog.blog_id}`)}>{blog.title}</li>
              )): <div>You dont have any blogs created yet</div>}
            </ul>
          </div>
          <div>
            <div>Following Blogs:</div>
            <ul className={styles.twoColumns}>
              {followsList.length > 0 ? followsList.map(blog => (
                <li key={blog.blog_id} onClick={() => snipNavigator(`/feed/${blog.blog_id}`)}>{blog.title}</li>
              )): <div>You are not following any blog yet</div>}
            </ul>
          </div>
        </div>
        <ProfileModal />
      </div>
    </div>
  )
}

export default ProfilePage