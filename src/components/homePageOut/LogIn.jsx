import axios from 'axios';
import React, { useContext, useState } from 'react';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';

import CurrentUserCtx from '../../context/currentUser';

import styles from './LogIn.module.css'

function LogInA() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUserCtx);
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const handleSubmit = async () => {
    const formData = {
      email: formEmail,
      password: formPassword
    };
    try {
      const response = await axios.post('http://localhost:3001/users/login', formData);
      if (response.status === 200) {
        const currentUser = response.data[0];
        currentUser.change = 0;
        setCurrentUser(currentUser);
        localStorage.setItem("USER_ID", response.data[0].user_id);
        navigate('/feed');
      } else {
        console.log(response.status)
      }
      return;
    } catch (error) {
      console.log('passwords dont match');
      return;
    }
  }

  return (
    <div>
      <h2>LogIn</h2>
      <Form className={styles.formWrapper}>
        <Form.Group className={styles.padingB1r}>
          <Form.Label>Email:</Form.Label>
          <Form.Control className={styles.controlCustom} type='email' value={formEmail} onChange={(e) => setFormEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className={styles.padingB1r}>
          <Form.Label>Password:</Form.Label>
          <Form.Control className={styles.controlCustom} type='password' value={formPassword} onChange={(e) => setFormPassword(e.target.value)}></Form.Control>
        </Form.Group>
      </Form>
      <button className={styles.button} variant="primary" type='submit' onClick={handleSubmit} >
        LogIn
      </button>
      <h4 className={styles.paddingT5r}>Still dont have an account? Dont waste any more time, SignUp right now!</h4>
    </div>
  )
}

export default LogInA