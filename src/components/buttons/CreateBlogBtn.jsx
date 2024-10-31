import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import axios from 'axios';

import CurrentUserCtx from '../../context/currentUser';
import { useNavigate } from 'react-router-dom';

import styles from './CreateBlogsBtn.module.css'

function CreateBlog() {
    const { setCurrentUser } = useContext(CurrentUserCtx);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogDescription, setBlogDescription] = useState('');

    const handleSubmit = async () => {
        const userId = localStorage.getItem("USER_ID");
        const formData = {
            title: blogTitle,
            description: blogDescription
        }
        try {
            const response = await axios.post(`http://localhost:3001/blogs/${userId}`, formData);
            setShowModal(false);
            setBlogTitle('');
            setBlogDescription('');
            setCurrentUser(prev => ({
                ...prev,
                change: prev.change + 1
            }));
            navigate(`/feed/${response.data[0].blog_id}`)
        } catch (error) {
            console.log(error)
        }
        
    }


  return (
      <div>
          <button className={styles.button} onClick={() => setShowModal(true)}>Create Blog</button>
          <Modal className={styles.modalCustom} show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header className={styles.modalBackground}>
                  <Modal.Title>Create Blog</Modal.Title>
              </Modal.Header>
              <Modal.Body className={styles.modalBackground}>
                  <Form>
                      <Form.Group>
                          <Form.Label>Blog Title:</Form.Label>
                          <Form.Control className={styles.controlCustom} type='text' value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Form.Group>
                          <Form.Label>Blog Description</Form.Label>
                          <Form.Control className={styles.controlCustomWide} as='textarea' rows={1} value={blogDescription} onChange={(e) => setBlogDescription(e.target.value)}></Form.Control>
                      </Form.Group>
                  </Form>
              </Modal.Body>
              <Modal.Footer className={styles.modalBackground}>
                  <button className={styles.button} variant="primary" type='submit' onClick={handleSubmit} >
                      Create
                  </button>
              </Modal.Footer>
          </Modal>
    </div>
  )
}

export default CreateBlog