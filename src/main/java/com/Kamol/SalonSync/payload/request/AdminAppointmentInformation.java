package com.Kamol.SalonSync.payload.request;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@ToString
@Getter
@Setter
public class AdminAppointmentInformation {
    Date from;
    Date to;
            
}
