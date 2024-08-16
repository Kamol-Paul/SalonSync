package com.Kamol.SalonSync.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Set;

@Getter
@AllArgsConstructor
@Setter
@NoArgsConstructor
@ToString
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    private String phoneNumber;
    private String address;

    private Set<String> roles;

    @NotBlank
    @Size(min = 4, max = 40)
    private String password;

}
