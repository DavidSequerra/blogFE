import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Overlay from "react-bootstrap/Overlay";
import Popover from 'react-bootstrap/Popover';

import styles from './DeleteBtn.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import CurrentUserCtx from '../../context/currentUser';


function DeleteBtn({ userId, type, typeId, refreshParent }) {
    const localId = localStorage.getItem("USER_ID");
    const { setCurrentUser } = useContext(CurrentUserCtx);
    const navigate = useNavigate();
    const [showOverlay, setShowOverlay] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        setShowOverlay(!showOverlay);
        setTarget(e.target);
    }


    const handleDeleteReply = async (e) => {
        e.preventDefault();
        let url = '';
        // eslint-disable-next-line default-case
        switch (type) {
            case 'Reply':
                url = `http://localhost:3001/replies/${typeId}?userId=${userId}`
                break;
            case 'Comment':
                url = `http://localhost:3001/replies/${typeId}?userId=${userId}`
                break;
            case 'Post':
                url = `http://localhost:3001/posts/${typeId}?userId=${userId}`
                break;
            case 'Blog':
                url = `http://localhost:3001/blogs/${typeId}?userId=${userId}`
                break;

        }
        
        if (url) {
            console.log(url);
            try {
                await axios.delete(url);
                if (type === 'Comment' || type === 'Reply') {
                    refreshParent();
                } else {
                    setCurrentUser(prev => ({
                    ...prev,
                    change: prev.change + 1
                }));
                }
                if (type === 'Blog') {
                    navigate('/feed');
                }
            } catch (error) {
                console.error('Error deleting:', error);
            }
        }
    }

    return (
        <div ref={ref}>
            {localId === userId && (<div>
                <span><i onClick={handleClick} className={`bi bi-trash`}></i></span>
            <Overlay show={showOverlay} rootClose={true} onHide={() => setShowOverlay(false)} target={target} placement='left' container={ref} >
                <Popover className={styles.popoverArrow}>
                    <Popover.Body className={styles.popoverWrapper}>
                        <div>Are you sure you want to delete this {type}?</div>
                        <button className={styles.redButton} onClick={handleDeleteReply}>Delete {type} </button>
                    </Popover.Body>
                </Popover>
            </Overlay>
            </div>)}
            
        </div>
    )
}

export default DeleteBtn;