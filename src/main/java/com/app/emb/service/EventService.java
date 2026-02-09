package com.app.emb.service;


import com.app.emb.entity.Event;
import com.app.emb.entity.User;
import com.app.emb.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository repo;

    public EventService(EventRepository repo) {
        this.repo = repo;
    }

    public Event create(Event event, User organizer) {
        event.setCreatedBy(organizer);
        return repo.save(event);
    }

    public List<Event> getAll() {
        return repo.findAll();
    }

    public Event getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Event update(Long id, Event updated) {
        Event event = getById(id);
        event.setTitle(updated.getTitle());
        event.setDescription(updated.getDescription());
        event.setEventDateTime(updated.getEventDateTime());
        event.setLocation(updated.getLocation());
        event.setPrice(updated.getPrice());
        return repo.save(event);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}

