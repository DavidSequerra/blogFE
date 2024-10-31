import React, { useContext, useState} from 'react';
import Form from "react-bootstrap/Form";
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import CurrentUserCtx from '../../context/currentUser';

import styles from './SignUp.module.css'

function SignupA() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUserCtx);
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formVerifyPassword, setFormVerifyPassword] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formBio, setFormBio] = useState('');
 

  const handleSignUp = async () => {
    const formData = {
      first_name: formFirstName,
      last_name: formLastName,
      username: formUsername,
      email: formEmail,
      img: 'https://res.cloudinary.com/dcgo03ddv/image/upload/v1726395756/zda6ccnibf1zszhmbs0c.webp',
      bio: formBio,
      password: formPassword
    };
    try {
      const response = await axios.post('http://localhost:3001/users/signup', formData);
      const currentUser = response.data[0];
      currentUser.change = 0;
      setCurrentUser(currentUser);
      localStorage.setItem("USER_ID", response.data[0].user_id);
      navigate('/feed')
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div>
      <h2>SignUp</h2>
      <Form className={styles.formWrapper}>
        <Form.Group className={styles.padingB1r}>
          <Form.Label>First Name:</Form.Label>
          <Form.Control className={styles.controlCustom} type='text' value={formFirstName} onChange={(e) => setFormFirstName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className={styles.padingB1r}>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control className={styles.controlCustom} type='text' value={formLastName} onChange={(e) => setFormLastName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className={styles.padingB1r}>
          <Form.Label>Username:</Form.Label>
          <Form.Control className={styles.controlCustom} type='text' value={formUsername} onChange={(e) => setFormUsername(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className={styles.padingB1r}>
          <Form.Label>Email:</Form.Label>
          <Form.Control className={styles.controlCustom} type='email' value={formEmail} onChange={(e) => setFormEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className={styles.padingB1r}>
          <Form.Label>Password:</Form.Label>
          <Form.Control className={styles.controlCustom} type='password' value={formPassword} onChange={(e) => setFormPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className={styles.padingB1r}>
          <Form.Label>Verify Password:</Form.Label>
          <Form.Control className={styles.controlCustom} type='password' value={formVerifyPassword} onChange={(e) => setFormVerifyPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className={styles.padingB1r}>
          <Form.Label>Bio:</Form.Label>
          <Form.Control className={styles.controlCustom} type='text' value={formBio} onChange={(e) => setFormBio(e.target.value)}></Form.Control>
        </Form.Group>
      </Form>
      <button className={styles.button} variant="primary" type='submit' onClick={handleSignUp} >
        SignUp
      </button>
    </div>
  )
}

export default SignupA