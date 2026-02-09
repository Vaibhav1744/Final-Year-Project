package com.app.emb.service;

import com.app.emb.dto.AuthResponse;
import com.app.emb.dto.LoginRequest;
import com.app.emb.dto.SignupRequest;
import com.app.emb.entity.Role;
import com.app.emb.entity.User;
import com.app.emb.repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(
            AuthenticationManager authManager,
            UserRepository userRepository,
            JwtService jwtService
    ) {
        this.authManager = authManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public AuthResponse login(LoginRequest request) {

        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtService.generateToken(auth);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        return new AuthResponse(token, user.getRole().name());
    }

    public void signup(SignupRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(
                new BCryptPasswordEncoder().encode(request.getPassword())
        );

        user.setRole(Role.valueOf(request.getRole().toUpperCase()));

        userRepository.save(user);
    }
}
