import React, { useEffect, useState, useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import SideBar from '../components/sideBar/SideBar';
import CreateBlog from '../components/buttons/CreateBlogBtn';
import axios from 'axios';

import CurrentUserCtx from '../context/currentUser';

import FollowBtn from '../components/buttons/FollowBtn';
import styles from './BlogsPage.module.css'



function BlogsPage() {
    const userId = localStorage.getItem("USER_ID");
    const { currentUser } = useContext(CurrentUserCtx);
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:3001/blogs");
            setBlogs(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchBlogs();
    }, [currentUser]);

    const snipNavigate = (path) => {
        setBlogs([]);
        navigate(`/feed/${path}`);
        window.scrollTo(0, 0);
    }


    return (
        <div className={styles.navbarMarginned}>
            <SideBar />
            <div className={styles.feedWrapper}>
                <h1>Blogs <span><CreateBlog/></span></h1>
                {blogs.map(blog => (
                    <div key={blog.blog_id} className={styles.cardWrapper}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitle} onClick={() => snipNavigate(blog.blog_id)}>{blog.title}</div>
                            <FollowBtn userId={userId} blogId={blog.blog_id} />
                        </div>
                        <div className={styles.carBody}>{blog.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BlogsPage;