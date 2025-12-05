#Student Detail 
###
Name:  Sai Changdas Masram
Roll no:68
Batch :A4
Branch:Computer Technology
Lab : Java FSD
# 📋 Task Management Board - Trello Style

A professional Trello-like task management application with drag-and-drop, time tracking, and priority management. Built with Spring Boot and vanilla JavaScript.

## ✨ Features

### 🎯 Core Features
- **Drag & Drop**: Move tasks between Pending, Ongoing, and Completed columns
- **Priority Management**: Set task priorities (Low, Medium, High) with color coding
- **Time Tracking**: Set time estimates and track time spent on tasks
- **Timer Functionality**: Start/stop timers for ongoing tasks
- **Real-time Stats**: Dashboard showing task counts and total time spent
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎨 UI/UX
- Modern gradient design with smooth animations
- Color-coded priority badges
- Visual feedback for drag-and-drop operations
- Modal-based task creation
- Professional card-based layout

## 🚀 Technologies

- **Backend**: Spring Boot 3.2.0, Java 17
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build Tool**: Maven
- **Storage**: In-memory (stateless)
- **Architecture**: RESTful API

## 📦 Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6+

### Installation & Running

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

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update a task |
| PATCH | `/api/tasks/{id}/status` | Update task status |
| DELETE | `/api/tasks/{id}` | Delete a task |

## 📊 Task Model

```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "status": "PENDING | ONGOING | COMPLETED",
  "priority": "LOW | MEDIUM | HIGH",
  "timeEstimate": 60,
  "timeSpent": 30,
  "createdAt": "2024-12-04T10:00:00",
  "dueDate": "2024-12-05T18:00:00"
}
```

## 🎯 Use Cases

- **Project Management**: Track team tasks and progress
- **Personal Productivity**: Manage daily tasks and goals
- **Sprint Planning**: Organize development sprints
- **Time Management**: Monitor time spent on activities
- **Portfolio Projects**: Showcase full-stack development skills

## 💡 Key Highlights for Recruiters

- ✅ Clean, maintainable code architecture
- ✅ RESTful API design principles
- ✅ Modern UI/UX with smooth interactions
- ✅ Drag-and-drop functionality implementation
- ✅ Real-time data updates
- ✅ Responsive design
- ✅ State management in vanilla JavaScript
- ✅ Professional-grade styling

## 📝 Note

This is a stateless application - all tasks are stored in memory and will be lost when the application restarts. Perfect for demos and testing without database setup. Can be easily extended to use persistent storage (MySQL, PostgreSQL, MongoDB).

## 🔮 Future Enhancements

- User authentication and authorization
- Database persistence (PostgreSQL/MySQL)
- Task assignments and collaboration
- File attachments
- Comments and activity logs
- Email notifications
- Calendar view
- Search and filtering

## 📄 License

This project is open source and available for portfolio and learning purposes.
