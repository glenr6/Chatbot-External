import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { getChatResponse } from '../utils/api';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      setChatHistory([...chatHistory, { content: message, sender: 'user' }]);
      setMessage('');

      const response = await getChatResponse(message);
      setChatHistory([
        ...chatHistory,
        { content: response.data.response, sender: 'chatbot' },
      ]);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center mt-4">Buddhism Chatbot</h2>
          <ListGroup>
            {chatHistory.map((item, index) => (
              <ListGroup.Item
                key={index}
                className={item.sender === 'user' ? 'text-right' : ''}
              >
                {item.content}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Chatbot;
