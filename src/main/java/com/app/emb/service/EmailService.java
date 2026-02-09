package com.app.emb.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendVerificationEmail(String email, String token) {
        System.out.println("VERIFY EMAIL:");
        System.out.println("http://localhost:8080/api/auth/verify?token=" + token);
    }
}
