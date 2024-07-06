package com.Kamol.SalonSync.payload.response;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

import java.util.List;

@ToString
@Getter
@Setter
public class JwtResponse {
    private final String token;
    private final String type = "Bearer";
    private final List<String> roles;
    private String id;
    private String username;
    private String email;
    private String phoneNumber;

    public JwtResponse(String accessToken, String id, String username, String email, List<String> roles, String phoneNumber) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.phoneNumber = phoneNumber;
    }
}
