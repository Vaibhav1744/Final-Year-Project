package com.app.emb.service;

import com.app.emb.dto.LoginRequest;
import com.app.emb.entity.User;
import com.app.emb.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ LOGIN GOES HERE
    public ResponseEntity<?> login(LoginRequest request) {

        try {
            User user = userRepository.findByEmail(request.getEmail())
                    .orElse(null);

            if (user == null) {
                return ResponseEntity.status(401).body("User not found");
            }

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(401).body("Invalid password");
            }

            String token = jwtService.generateToken(user.getEmail());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole().name());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(500)
                    .body("Login failed: " + e.getMessage());
        }
    }
}
