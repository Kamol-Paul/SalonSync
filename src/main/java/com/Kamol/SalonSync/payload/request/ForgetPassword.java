package com.Kamol.SalonSync.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgetPassword {
    private String email;
    private String opt;
    private String newPassword;
}
