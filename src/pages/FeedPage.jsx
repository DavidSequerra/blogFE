import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../components/sideBar/SideBar';

import PostBtn from '../components/buttons/PostBtn';
import RepliesSection from '../components/buttons/RepliesSection';
import LikeBtn from '../components/buttons/LikeBtn';
import UserCard from '../components/userCard/UserCard';
import DeleteBtn from '../components/buttons/DeleteBtn';
import CurrentUserCtx from '../context/currentUser';

import styles from './FeedPage.module.css'

function FeedPage() {
    const userId = localStorage.getItem("USER_ID");
    const { currentUser } = useContext(CurrentUserCtx);
    const navigate = useNavigate();
    const { blogId } = useParams();
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [title, setTitle] = useState('');

    const fetchPosts = async () => {
        try {
            if (blogId) {
                const response = await axios.get(`http://localhost:3001/posts/${blogId}`);
                if (response.data.length > 0) {
                    setPosts(response.data);
                } else {
                    const response = await axios.get(`http://localhost:3001/blogs/${blogId}`);
                    setTitle(response.data[0].title);
                }
            } else {
                const response = await axios.get(`http://localhost:3001/posts/usersBlogs`);
                setAllPosts(response.data);
                setPosts([]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const snipNavigate = (path) => {
        navigate(`/feed/${path}`);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        setPosts([]);
        setAllPosts([]);
        setTitle([]);
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blogId, currentUser]);

    return (
        <div className={styles.navbarMarginned}>
            <SideBar />
            <div className={styles.feedWrapper}>
                {posts.length >= 1 ? (
                    <div className={styles.pageHeader}>
                        <div className={styles.pageHeaderSections}>
                            <h1 className={styles.feedTitle}>{posts[0].title}</h1>
                            <DeleteBtn
                                className={styles.redButtonSub}
                                userId={posts[0].user_id}
                                type={'Blog'}
                                typeId={posts[0].blog_id}
                                refreshParent={fetchPosts}
                            />
                        </div>
                        <PostBtn blogId={posts[0].blog_id} />
                    </div>
                ) : allPosts.length >= 1 ? (
                    <h1 className={styles.feedTitle}>Last Posts</h1>
                ) : (
                    <div className={styles.pageHeader}>
                        <div className={styles.pageHeaderSections}>
                                    <h1 className={styles.feedTitle}>No posts yet for blog:<span className={`${styles.underliner} ${styles.feedTitle}`}><br></br>{title}</span></h1>
                                    
                            <DeleteBtn
                                className={styles.redButtonSub}
                                userId={userId}
                                type={'Blog'}
                                typeId={blogId}
                                refreshParent={fetchPosts}
                            />
                                </div>
                                
                        <PostBtn blogId={blogId} />
                    </div>
                )}
                {posts.map(post => (
                    <div key={post.post_id}>
                        <div className={styles.cardWrapper}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <UserCard username={post.username} avatarClass={styles.feedUserAvatar} userImg={post.img} />
                                </div>
                                <div>
                                    <DeleteBtn
                                        className={styles.redButtonSub}
                                        userId={post.user_id}
                                        type={'Post'}
                                        typeId={post.post_id}
                                        refreshParent={fetchPosts}
                                    />
                                </div>
                            </div>
                            <div className={styles.contentWrapper}>
                                <div className={styles.carBody}>{post.content}</div>
                                <div>
                                    <LikeBtn userId={userId} itemId={post.post_id} itemType="post" />
                                </div>
                            </div>
                            <div className={`${styles.cardFooter} ${styles.flexerRelative}`}>
                                <RepliesSection postId={post.post_id} userId={userId} replyCount={posts} />
                            </div>
                        </div>
                    </div>
                ))}
                {allPosts.map(post => (
                    <div key={post.post_id}>
                        <div className={styles.cardWrapper}>
                            <div className={styles.cardHeader}>
                                <div className={styles.underliner} onClick={() => snipNavigate(post.blog_id)}>Blog: {post.title}</div>
                                <UserCard username={post.username} avatarClass={styles.feedUserAvatar} userImg={post.img} />
                            </div>
                            <div className={styles.contentWrapper}>
                                <div className={styles.carBody}>{post.content}</div>
                                <div>
                                    <LikeBtn userId={userId} itemId={post.post_id} itemType="post" />
                                </div>
                            </div>
                            <div className={`${styles.cardFooter} ${styles.flexerRelative}`}>
                                <RepliesSection postId={post.post_id} userId={userId} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeedPage;
