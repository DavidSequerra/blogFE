import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import CurrentUserCtx from '../../context/currentUser';

import styles from './PictureModal.module.css';

function PictureModal() {
    const userId = localStorage.getItem("USER_ID");
    const { currentUser, setCurrentUser } = useContext(CurrentUserCtx);
    const [clicked, setClicked] = useState(false);
    const [formImg, setFormImg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) {
                try {
                    const response = await axios.get(`http://localhost:3001/users/${userId}`);
                    const data = response.data[0];
                    setFormImg(data.img || '');
                } catch (error) {
                    console.error(error);
                }
            } else {
                setFormImg(currentUser.img || '');
            }
        }
        fetchData();
    }, [currentUser, userId]);

    const handleChanges = async (e) => {
        e.preventDefault();
        const formData = { ...currentUser };
        formData.img = formImg;
        if (!formImg) {
            formData.img = currentUser.img
        }
        try {
            const response = await axios.put(`http://localhost:3001/users/update/${userId}`, formData);
            console.log(response.data[0])
            if (response) {
                setCurrentUser(response.data[0])
                window.alert('Profile Updated!')
            }
        } catch (error) {
            console.log(error);
            return;
        }

    };


    const handleDeleteImg = async (e) => {
        e.preventDefault();
        const imgData = {
            key: 'img',
            value: 'https://res.cloudinary.com/dcgo03ddv/image/upload/v1726395756/zda6ccnibf1zszhmbs0c.webp'
        }
        try {
            const response = await axios.put(`http://localhost:3001/users/updateKeyValue/${userId}`, imgData);
            setCurrentUser(response.data[0]);
        } catch (error) {
            console.log(error);
            return;
        }

    }

    const handleChangeImg = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'petAddoption');
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dcgo03ddv/image/upload', formData);
            setFormImg(`${response.data.secure_url}`);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }


    return (
        <div>
            <div className={styles.avatarWrapper} onClick={() => setClicked(true)}>
                <div className={styles.avatarRing}>
                    <img src={currentUser.img} alt='' className={styles.imgIcon}></img>
                </div>
            </div>
            <Modal show={clicked} onHide={() => setClicked(false)}  >
                <Modal.Header className={styles.bgColor}>
                    <div >
                        update profile picture
                    </div>
                </Modal.Header>
                <Modal.Body className={styles.bgColorBlack}>
                    <Form.Group >
                        <div >
                            <img src={currentUser.img} alt='' className={styles.imgIcon} ></img>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className={styles.bgColor}>
                    <Form.Control type='file' className={styles.margine} onChange={handleChangeImg}></Form.Control>
                    <div className={styles.flexer}>
                        <button type='submit' onClick={handleChanges} className={`${styles.flexChild} ${styles.greenButton}`}>Update picture</button>
                        <button type='delete' onClick={handleDeleteImg} className={`${styles.flexChild} ${styles.redButton}`}>Delete picture</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PictureModal