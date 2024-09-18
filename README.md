
# Issue Tracker Application

This project is a simple **Issue Tracker** application consisting of a **Node.js (Express) API server** and a **React.js** frontend. The entire application is Dockerized using **Docker Compose**, which orchestrates both the server and client containers.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Accessing the Application](#accessing-the-application)
- [Stopping the Application](#stopping-the-application)
- [Building Without Docker](#building-without-docker)
- [Troubleshooting](#troubleshooting)

## Project Overview

The project contains two parts:
1. **Node.js (Express) API Server**: This is the backend that handles CRUD operations for issues.
2. **React.js Frontend**: The user interface that interacts with the API and allows users to create, update, view, and delete issues.

Both components are containerized using Docker and run simultaneously using Docker Compose.

## Technologies Used
- **Node.js** with **Express** (Backend API)
- **React.js** (Frontend UI)
- **Tailwind CSS** (Styling)
- **Docker** and **Docker Compose** (Containerization)
- **Nginx** (Serves the React app in production)

## Prerequisites
Make sure you have the following installed:
- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)

> _"It always seems impossible until it's done."_ — Nelson Mandela  
> With Docker, running complex environments becomes simpler and more manageable, making the "impossible" just a few commands away!

## Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Ensure Docker is Installed**:
   Install Docker and Docker Compose if they are not already set up on your machine. You can verify the installation by running:
   ```bash
   docker --version
   docker-compose --version
   ```

## Running the Application

To build and run the application using Docker Compose, follow these steps:

1. **Build and Start Containers**:
   ```bash
   docker-compose up --build
   ```

   This command will:
   - Build the Docker images for the Node.js API server and the React client.
   - Start the containers and run both services.

2. **View the Application**:
   - **React Client**: Visit [http://localhost:3000](http://localhost:3000) to access the frontend.
   - **API Server**: The backend runs on [http://localhost:3001](http://localhost:3001).

### API Endpoints

- **GET** `/issues`: Fetch all issues.
- **POST** `/issues`: Create a new issue.
- **PUT** `/issues/:id`: Update an existing issue.
- **DELETE** `/issues/:id`: Delete an issue by ID.

## Stopping the Application

To stop and remove the containers, run:

```bash
docker-compose down
```

This will stop all running containers and remove the network created by Docker Compose.

## Building Without Docker

If you want to run the project locally without Docker, follow these steps:

1. **Start the Node.js Server**:
   - Navigate to the `issue-tracker-server` directory:
     ```bash
     cd issue-tracker-server
     npm install
     node server.js
     ```
   - The server will run at [http://localhost:3001](http://localhost:3001).

2. **Start the React Client**:
   - Navigate to the `issue-tracker-client` directory:
     ```bash
     cd issue-tracker-client
     npm install
     npm start
     ```
   - The React app will run at [http://localhost:3000](http://localhost:3000).

> _"In the end, everything is a workaround."_ — Linus Torvalds  
> This setup shows how Docker simplifies deployment, but if you prefer local development without Docker, you can still use Node.js and React directly.

## Troubleshooting

- **Port Conflicts**: If you encounter port conflicts, ensure that ports `3000` (for React) and `3001` (for Node.js API) are not in use by other applications.
- **Docker Issues**: If you run into any Docker-related issues, try rebuilding the containers:
  ```bash
  docker-compose up --build
  ```

## Conclusion

With Docker, running this project is as simple as executing a few commands. By encapsulating the application into containers, you ensure that it runs consistently across different environments. Whether you’re testing or deploying, Docker provides a reliable way to manage the system.

_"Do or do not, there is no try."_ — Yoda  
Now that everything is wrapped with Docker, you're ready to "do" it!
