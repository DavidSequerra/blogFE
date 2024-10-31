import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import CurrentUserCtx from '../../context/currentUser';

import styles from './PostBtn.module.css'

function PostBtn({blogId}) {
    const { setCurrentUser } = useContext(CurrentUserCtx);
    const [showModal, setShowModal] = useState(false);
    const [postContent, setPostContent] = useState('');
    const userId = localStorage.getItem("USER_ID");

    const handlePost = async () => {

        const blog_id = blogId
        const postData = {
            blog_id: blog_id,
            user_id: userId,
            content: postContent
        }
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(`http://localhost:3001/posts/newPost`, postData);
            setShowModal(false);
            setPostContent('');
            setCurrentUser(prev => ({
                ...prev,
                change: prev.change + 1
            }));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button className={styles.button} onClick={() => setShowModal(true)}>New post</button>
            <Modal className={styles.modalCustom} show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header className={styles.modalBackground}>
                    <Modal.Title>New post</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBackground}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Post content:</Form.Label>
                            <Form.Control className={styles.controlCustomWide} as='textarea' rows={1} value={postContent} onChange={(e) => setPostContent(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={styles.modalBackground}>
                    <button className={styles.button} variant="primary" type='submit' onClick={handlePost} >
                        Post
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PostBtn