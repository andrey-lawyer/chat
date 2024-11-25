# Chat Project

This project is a web application that combines a Groovy-based backend with a React frontend, offering a seamless and interactive chat experience. It features secure user authentication, real-time messaging through WebSockets, and robust session management powered by Redis. Users can register, log in, and communicate in a dynamic chat environment with support for role-based access and message history. The application ensures smooth and efficient handling of user sessions, providing an engaging, secure, and scalable solution for real-time communication.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Backend Configuration Overview](#backend-configuration-overview)
- [Frontend Overview](#frontend-overview)

## Technologies


- React (Frontend)
- Spring Boot, Groovy (Backend)
- WebSockets (Real-time messaging)
- Spring Security (Authentication and Authorization)
- MongoDb (Database)
- Redis (Session management)
- Docker (Containerization)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/andrey-lawyer/chat
   ```

## Running the Project

To start the project, run:

```bash
docker-compose up
```
Once the containers are up and running, you can access the application at the following address:

http://localhost:3000

## Project Structure

- **back/**: Contains the Spring Boot backend code.
- **front/**: Contains the React frontend code.
- **docker-compose.yml**: Configuration for Docker services.

## Backend Configuration Overview

The backend is built using Groovy and integrates with Spring Security for user authentication, Redis for session management, and WebSockets for real-time communication.

- Security Configuration: Configures HTTP security with paths for authentication, user registration, and admin routes.
- WebSocket Setup: A ChatWebSocketHandler to handle incoming and outgoing messages, with the possibility of broadcasting messages to connected clients.
- Redis Integration: RedisTemplate and ReactiveRedisTemplate beans are used for managing user sessions and caching.
- User Management: Uses a repository to handle user details, roles, and authentication. The service includes functionalities like registration, login, and profile updates.
- WebSocket Chat: A real-time messaging feature using WebSockets, where authenticated users can send and receive messages.

## Frontend Overview
The frontend is built with React and communicates with the backend via REST APIs and WebSockets. It includes:

- User Authentication: Forms for registration, login, and profile updates.
- WebSocket Integration: To manage real-time chat messages and notifications.

