package com.app.emb.controller;

import com.app.emb.entity.Booking;
import com.app.emb.entity.User;
import com.app.emb.repository.UserRepository;
import com.app.emb.service.BookingService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService service;
    private final UserRepository userRepo;

    public BookingController(BookingService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    // USER books an event
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{eventId}")
    public Booking bookEvent(@PathVariable Long eventId, Principal principal) {
        User user = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return service.bookEvent(user, eventId);
    }

    // USER booking history
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my")
    public List<Booking> myBookings(Principal principal) {
        User user = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return service.getUserBookings(user);
    }
}
