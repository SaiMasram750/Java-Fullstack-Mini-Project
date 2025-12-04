package com.taskmanager.controller;

import com.taskmanager.model.Task;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    
    private final List<Task> tasks = new ArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    
    @GetMapping
    public List<Task> getAllTasks() {
        return tasks;
    }
    
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        task.setId(idGenerator.getAndIncrement());
        if (task.getStatus() == null) task.setStatus("PENDING");
        if (task.getPriority() == null) task.setPriority("MEDIUM");
        if (task.getTimeSpent() == null) task.setTimeSpent(0);
        tasks.add(task);
        return task;
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return tasks.stream()
            .filter(task -> task.getId().equals(id))
            .findFirst()
            .map(task -> {
                task.setTitle(taskDetails.getTitle());
                task.setDescription(taskDetails.getDescription());
                task.setStatus(taskDetails.getStatus());
                task.setPriority(taskDetails.getPriority());
                task.setTimeEstimate(taskDetails.getTimeEstimate());
                task.setTimeSpent(taskDetails.getTimeSpent());
                task.setDueDate(taskDetails.getDueDate());
                return ResponseEntity.ok(task);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long id, @RequestBody String status) {
        return tasks.stream()
            .filter(task -> task.getId().equals(id))
            .findFirst()
            .map(task -> {
                task.setStatus(status);
                return ResponseEntity.ok(task);
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        boolean removed = tasks.removeIf(task -> task.getId().equals(id));
        return removed ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
