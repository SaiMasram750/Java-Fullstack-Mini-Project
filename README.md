# Task Manager

A simple task management application built with Spring Boot and vanilla JavaScript.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Clean and modern UI
- RESTful API backend

## Technologies

- **Backend**: Spring Boot 3.2.0, Spring Data JPA, H2 Database
- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: Maven

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Running the Application

1. Clone the repository
```bash
git clone <your-repo-url>
cd task-manager
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

## Database

The application uses an in-memory H2 database. You can access the H2 console at `http://localhost:8080/h2-console` with:
- JDBC URL: `jdbc:h2:mem:taskdb`
- Username: `sa`
- Password: (leave empty)
