# Task Manager

A simple stateless task management application built with Spring Boot and vanilla JavaScript.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Clean and modern UI
- RESTful API backend
- **Stateless**: Tasks are stored in memory and reset on restart

## Technologies

- **Backend**: Spring Boot 3.2.0
- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: Maven
- **Storage**: In-memory (stateless)

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Running the Application

1. Clone the repository
```bash
git clone https://github.com/SaiMasram750/Java-Fullstack-Mini-Project.git
cd Java-Fullstack-Mini-Project
```

2. Run the application
```bash
mvn spring-boot:run
```

3. Open your browser and navigate to `http://localhost:8080`

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

## Note

This is a stateless application - all tasks are stored in memory and will be lost when the application restarts. This makes it perfect for demos and testing without needing a database setup.
