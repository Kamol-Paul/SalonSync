package com.Kamol.SalonSync.services;

import com.Kamol.SalonSync.models.User;

public interface EmailService {
    void sendSimpleMail(User user, String url);
}
