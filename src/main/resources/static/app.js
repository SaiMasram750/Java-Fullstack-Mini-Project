const API_URL = 'http://localhost:8080/api/tasks';
let tasks = [];
let timers = {};

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        tasks = await response.json();
        renderTasks();
        updateStats();
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

function renderTasks() {
    // Clear all lists
    document.getElementById('pending-list').innerHTML = '';
    document.getElementById('ongoing-list').innerHTML = '';
    document.getElementById('completed-list').innerHTML = '';
    
    // Render tasks in their respective columns
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        const listId = task.status.toLowerCase() + '-list';
        document.getElementById(listId).appendChild(taskElement);
    });
    
    updateColumnCounts();
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = 'task-card';
    div.draggable = true;
    div.dataset.taskId = task.id;
    div.ondragstart = drag;
    
    const timeEstimate = task.timeEstimate || 0;
    const timeSpent = task.timeSpent || 0;
    const timeRemaining = Math.max(0, timeEstimate - timeSpent);
    
    const isTimerActive = timers[task.id] !== undefined;
    
    div.innerHTML = `
        <div class="task-header">
            <div class="task-title">${task.title}</div>
            <span class="task-priority ${task.priority}">${task.priority}</span>
        </div>
        ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
        <div class="task-meta">
            ${timeEstimate > 0 ? `
                <div class="task-time">⏱️ ${timeSpent}/${timeEstimate} min</div>
                <div class="task-time">⏳ ${timeRemaining} min left</div>
            ` : ''}
        </div>
        <div class="task-actions">
            ${task.status === 'ONGOING' ? `
                <button class="timer-btn ${isTimerActive ? 'active' : ''}" onclick="toggleTimer(${task.id})">
                    ${isTimerActive ? '⏸️ Stop' : '▶️ Start'}
                </button>
            ` : ''}
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️ Delete</button>
        </div>
    `;
    
    return div;
}

function updateColumnCounts() {
    const pending = tasks.filter(t => t.status === 'PENDING').length;
    const ongoing = tasks.filter(t => t.status === 'ONGOING').length;
    const completed = tasks.filter(t => t.status === 'COMPLETED').length;
    
    document.getElementById('pending-count').textContent = pending;
    document.getElementById('ongoing-count').textContent = ongoing;
    document.getElementById('completed-count').textContent = completed;
}

function updateStats() {
    const pending = tasks.filter(t => t.status === 'PENDING').length;
    const ongoing = tasks.filter(t => t.status === 'ONGOING').length;
    const completed = tasks.filter(t => t.status === 'COMPLETED').length;
    const totalMinutes = tasks.reduce((sum, t) => sum + (t.timeSpent || 0), 0);
    const totalHours = (totalMinutes / 60).toFixed(1);
    
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('ongoingCount').textContent = ongoing;
    document.getElementById('completedCount').textContent = completed;
    document.getElementById('totalTime').textContent = totalHours + 'h';
}

// Modal functions
function openTaskModal() {
    document.getElementById('taskModal').style.display = 'block';
}

function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
    document.getElementById('taskForm').reset();
}

window.onclick = function(event) {
    const modal = document.getElementById('taskModal');
    if (event.target === modal) {
        closeTaskModal();
    }
}

async function addTask(event) {
    event.preventDefault();
    
    const task = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        priority: document.getElementById('taskPriority').value,
        timeEstimate: parseInt(document.getElementById('taskTimeEstimate').value) || 0,
        status: 'PENDING',
        timeSpent: 0
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        
        if (response.ok) {
            closeTaskModal();
            loadTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    // Stop timer if active
    if (timers[id]) {
        clearInterval(timers[id]);
        delete timers[id];
    }
    
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Drag and Drop functions
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('taskId', event.target.dataset.taskId);
    event.target.classList.add('dragging');
}

async function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('taskId');
    const task = tasks.find(t => t.id == taskId);
    
    if (!task) return;
    
    // Find the column
    let dropTarget = event.target;
    while (dropTarget && !dropTarget.classList.contains('task-list')) {
        dropTarget = dropTarget.parentElement;
    }
    
    if (!dropTarget) return;
    
    const column = dropTarget.parentElement;
    const newStatus = column.dataset.status;
    
    if (task.status !== newStatus) {
        task.status = newStatus;
        
        try {
            await fetch(`${API_URL}/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            });
            
            loadTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }
    
    document.querySelectorAll('.task-card').forEach(card => {
        card.classList.remove('dragging');
    });
}

// Timer functions
function toggleTimer(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    if (timers[taskId]) {
        // Stop timer
        clearInterval(timers[taskId]);
        delete timers[taskId];
        updateTaskTime(taskId);
    } else {
        // Start timer
        timers[taskId] = setInterval(() => {
            task.timeSpent = (task.timeSpent || 0) + 1;
            renderTasks();
            updateStats();
        }, 60000); // Update every minute
    }
    
    renderTasks();
}

async function updateTaskTime(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    try {
        await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        updateStats();
    } catch (error) {
        console.error('Error updating task time:', error);
    }
}
