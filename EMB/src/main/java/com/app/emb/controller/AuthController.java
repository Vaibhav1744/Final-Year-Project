package com.app.emb.controller;

import com.app.emb.dto.AuthResponse;
import com.app.emb.dto.LoginRequest;
import com.app.emb.dto.SignupRequest;
import com.app.emb.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        service.signup(request);
        return "Signup successful";
    }
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return service.login(request);
    }
}
