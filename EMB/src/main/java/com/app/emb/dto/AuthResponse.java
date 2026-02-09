package com.app.emb.dto;

public class AuthResponse {
    private String token;
    private String role;

    public AuthResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    public AuthResponse() {
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }
}
