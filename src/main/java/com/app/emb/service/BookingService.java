package com.app.emb.service;

import com.app.emb.entity.Booking;
import com.app.emb.entity.Event;
import com.app.emb.entity.User;
import com.app.emb.repository.BookingRepository;
import com.app.emb.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;
    private final EventRepository eventRepo;

    public BookingService(BookingRepository bookingRepo, EventRepository eventRepo) {
        this.bookingRepo = bookingRepo;
        this.eventRepo = eventRepo;
    }

    public Booking bookEvent(User user, Long eventId) {
        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setBookingTime(LocalDateTime.now());
        booking.setStatus("CONFIRMED");

        return bookingRepo.save(booking);
    }

    public List<Booking> getUserBookings(User user) {
        return bookingRepo.findByUser(user);
    }
}
