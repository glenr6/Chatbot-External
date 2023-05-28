import React from 'react';
import { ListGroup } from 'react-bootstrap';

const MessageList = ({ messages }) => {
  return (
    <ListGroup>
      {messages.map((message, index) => (
        <ListGroup.Item key={index} className={`text-${message.sender === 'user' ? 'right' : 'left'}`}>
          {message.text}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default MessageList;
