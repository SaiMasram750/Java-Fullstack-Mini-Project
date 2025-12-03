const API_URL = 'http://localhost:8080/api/tasks';

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

function displayTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <input type="checkbox" class="task-checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id}, ${!task.completed})">
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description || ''}</div>
            </div>
            <div class="task-actions">
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        tasksList.appendChild(taskElement);
    });
}

async function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, completed: false })
        });
        
        if (response.ok) {
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            loadTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const task = await response.json();
        
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...task, completed })
        });
        
        loadTasks();
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}
