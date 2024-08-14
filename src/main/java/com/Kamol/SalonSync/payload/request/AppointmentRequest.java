package com.Kamol.SalonSync.payload.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@ToString
@Getter
@Setter
public class AppointmentRequest {
    private String salonId;
    private String serviceId;
}
