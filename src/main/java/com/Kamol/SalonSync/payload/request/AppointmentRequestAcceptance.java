package com.Kamol.SalonSync.payload.request;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@ToString
@Getter
@Setter
public class AppointmentRequestAcceptance {
    private String barberId;
    private Date date;
}
