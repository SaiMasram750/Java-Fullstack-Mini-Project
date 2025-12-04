package com.taskmanager.model;

import java.time.LocalDateTime;

public class Task {
    private Long id;
    private String title;
    private String description;
    private String status; // PENDING, ONGOING, COMPLETED
    private String priority; // LOW, MEDIUM, HIGH
    private Integer timeEstimate; // in minutes
    private Integer timeSpent; // in minutes
    private LocalDateTime createdAt;
    private LocalDateTime dueDate;
    
    public Task() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
        this.priority = "MEDIUM";
        this.timeSpent = 0;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    
    public Integer getTimeEstimate() { return timeEstimate; }
    public void setTimeEstimate(Integer timeEstimate) { this.timeEstimate = timeEstimate; }
    
    public Integer getTimeSpent() { return timeSpent; }
    public void setTimeSpent(Integer timeSpent) { this.timeSpent = timeSpent; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getDueDate() { return dueDate; }
    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
}
