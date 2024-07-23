package com.Kamol.SalonSync.services;
public interface CustomerService  {
     void updateResetPasswordToken(String token, String email);
     void UpdatePassword(String email, String newPassword);
     boolean checkOPT(String email, String OTP);
}
