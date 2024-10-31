import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import CurrentUserCtx from '../../context/currentUser';
import styles from './ProfileModal.module.css'

function ProfileModal() {
    const userId = localStorage.getItem("USER_ID");
    const { currentUser, setCurrentUser } = useContext(CurrentUserCtx);
    const [clicked, setClicked] = useState(false);
    const [formFirstName, setFormFirstName] = useState('');
    const [formLastName, setFormLastName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [formUsername, setFormUsername] = useState('');
    const [formBio, setFormBio] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) {
                try {
                    const response = await axios.get(`http://localhost:3001/users/${userId}`);
                    const data = response.data[0];
                    setFormFirstName(data.first_name || '');
                    setFormLastName(data.last_name || '');
                    setFormEmail(data.email || '');
                    setFormUsername(data.username || '');
                    setFormBio(data.bio || '');
                    setFormPassword(data.password || '');
                } catch (error) {
                    console.error(error);
                }
            } else {
                setFormFirstName(currentUser.first_name || '');
                setFormLastName(currentUser.last_name || '');
                setFormEmail(currentUser.email || '');
                setFormUsername(currentUser.username || '');
                setFormBio(currentUser.bio || '');
                setFormPassword(currentUser.password || '');
            }
        }
        fetchData();
    }, [currentUser, userId]);

    const handleChanges = async (e) => {
        e.preventDefault();
        const formData = {
            first_name: formFirstName,
            last_name: formLastName,
            email: formEmail,
            img: currentUser.img,
            username: formUsername,
            bio: formBio,
            password: formPassword
        };
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
  return (
      <div >
          <button className={styles.button} onClick={() => setClicked(true)}>Edit Profile</button>
          <Modal show={clicked}  onHide={() => setClicked(false)}>
              <Modal.Header className={styles.backgroundTest}>
                  <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body className={styles.backgroundTest}>
                  <Form onSubmit={handleChanges}>
                      <Form.Group className={styles.paddingB1r}>
                          <Form.Label>First Name:</Form.Label>
                          <Form.Control className={styles.controlCustom} type='text' value={formFirstName} onChange={(e) => setFormFirstName(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Form.Group className={styles.paddingB1r}>
                          <Form.Label>Last Name:</Form.Label>
                          <Form.Control className={styles.controlCustom} type='text' value={formLastName} onChange={(e) => setFormLastName(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Form.Group className={styles.paddingB1r}>
                          <Form.Label>Username:</Form.Label>
                          <Form.Control className={styles.controlCustom} type='text' value={formUsername} onChange={(e) => setFormUsername(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Form.Group className={styles.paddingB1r}>
                          <Form.Label>Email:</Form.Label>
                          <Form.Control className={styles.controlCustom} type='email' value={formEmail} onChange={(e) => setFormEmail(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Form.Group className={styles.paddingB1r}>
                          <Form.Label>Password:</Form.Label>
                          <Form.Control className={styles.controlCustom} type='password' value={formPassword} onChange={(e) => setFormPassword(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Form.Group className={styles.paddingB1r}>
                          <Form.Label>Bio:</Form.Label>
                          <Form.Control className={styles.controlCustom} type='text' value={formBio} onChange={(e) => setFormBio(e.target.value)}></Form.Control>
                      </Form.Group>
                  </Form>
              </Modal.Body>
              <Modal.Footer className={styles.backgroundTest}>
                  <button className={styles.button}  onClick={handleChanges} type='submit'>
                      Save Changes
                  </button>
              </Modal.Footer>
          </Modal>
    </div>
  )
}

export default ProfileModal