package com.Kamol.SalonSync.services;

import com.Kamol.SalonSync.models.Appointment;
import com.Kamol.SalonSync.models.User;

public interface EmailService {
    void sendSimpleMail(User user, String url);
    void sendMail(String email, String url);
    void sendCalledMail(Appointment appointment);
}
