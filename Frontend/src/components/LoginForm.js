import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import * as api from '../utils/api';

const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.loginUser({ username, password });
      history.push('/chat');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      {error && <p className="text-danger">{error}</p>}
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
