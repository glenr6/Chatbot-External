# Buddhist Chatbot

Author: Glen Rose
Date: 06/05/2023

This is a chatbot application that allows users to ask questions about Buddhism and receive answers based on a pre-trained model. The application has a React frontend, a Python backend, and uses OpenAI's GPT-4 as the language model.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and account management
- Real-time chat interface for asking and receiving answers about Buddhism
- Cache of chate history and generated responses
- Pre-trained GPT-4 model for generating responses

## Installation

-----
Clone the repository:

git clone 

----
Navigate to the project folder:

cd buddhist-chatbot

----
Install the required backend dependencies:
pip install -r requirements.txt

----
install required frontend dependencies
cd frontend
npm install

-----
(Optional) If you haven't already, set up a GPT-4 API key and configure the backend's config.py file.

## Usage

----
start backend server
cd backend
python app.py


In a separate terminal, start the frontend development server:

cd frontend
npm start

Open your web browser and visit http://localhost:3000 to use the application.

## Dependencies

The main dependencies for this project are:

Backend:

Flask
Flask-SQLAlchemy
Flask-Migrate
Flask-Login
Flask-CORS
Requests
Frontend:

React
Axios
React-Router-Dom
Bootstrap
Language Model:

OpenAI GPT-4 (Requires API key)

## Liscence 

This project is liscenced under the MIT Liscence:  https://mit-license.org/ 

#npx create-react-app buddhism-chatbox
#npm install axios react-router-dom bootstrap react-bootstrap