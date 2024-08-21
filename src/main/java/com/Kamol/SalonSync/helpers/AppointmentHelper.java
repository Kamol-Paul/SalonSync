package com.Kamol.SalonSync.helpers;

import jakarta.validation.constraints.NotNull;

public class AppointmentHelper {
    public void sendMessage(String phoneNumber){
        phoneNumber = generateValidNumber(phoneNumber);

    }
    String generateValidNumber(@NotNull String phoneNumber){
        String lastTenDigit = phoneNumber.substring(phoneNumber.length() - 10);
        return "880" + lastTenDigit;
    }
}
