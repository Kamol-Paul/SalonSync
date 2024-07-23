package com.Kamol.SalonSync.services;

import com.Kamol.SalonSync.models.User;

public interface CustomerService  {
    public void updateResetPasswordToken(String token, String email);
    public void UpdatePassword(String email, String newPassword);
    public boolean checkOPT(String email, String OTP);
}
