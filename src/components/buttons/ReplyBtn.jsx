import React, { useRef, useState } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Overlay from "react-bootstrap/Overlay";
import Popover from 'react-bootstrap/Popover';

import styles from './ReplyBtn.module.css';

function ReplyBtn({ postId, parentReplyId, refreshParent }) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [target, setTarget] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const ref = useRef(null);
    const userId = localStorage.getItem("USER_ID");

    const handleClick = (e) => {
        e.preventDefault();
        setShowOverlay(!showOverlay);
        setTarget(e.target);
    };

    const handleReply = async (e) => {
        e.preventDefault();
        try {
            const newData = {
                post_id: postId,
                parent_reply_id: parentReplyId,
                content: replyContent,
                user_id: userId
            };
            if (postId.length > 0) {
                // eslint-disable-next-line no-unused-vars
                const response = await axios.post(`http://localhost:3001/replies/newReply`, newData);
                setReplyContent('');
                setShowOverlay(!showOverlay);
                refreshParent();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.flexerRelative} ref={ref}>
            <button className={styles.replyButton} onClick={handleClick}>reply</button>
            <Overlay show={showOverlay} rootClose={true} onHide={()=> setShowOverlay(false)} target={target} placement='bottom' container={ref} containerPadding={20}>
                <Popover className={styles.popoverWrapper}>
                    <Popover.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control className={styles.width20r} as='textarea' rows={1} value={replyContent} onChange={(e) => setReplyContent(e.target.value)}></Form.Control>
                            </Form.Group>
                            <button className={styles.popoverButton} onClick={handleReply}>Reply</button>
                        </Form>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
}

export default ReplyBtn;
