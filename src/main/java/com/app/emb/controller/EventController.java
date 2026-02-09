package com.app.emb.controller;

import com.app.emb.entity.Event;
import com.app.emb.entity.User;
import com.app.emb.service.EventService;
import com.app.emb.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final UserRepository userRepository;

    public EventController(EventService eventService,
                           UserRepository userRepository) {
        this.eventService = eventService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Event create(@RequestBody Event event) {

        // TEMPORARY FIX UNTIL JWT
        User organizer = userRepository
                .findByEmail("vaibhav_fix@test.com")
                .orElseThrow(() -> new RuntimeException("User not found"));

        return eventService.create(event, organizer);
    }

    @GetMapping
    public List<Event> getAll() {
        return eventService.getAll();
    }
}
