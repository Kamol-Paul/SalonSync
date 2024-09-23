package com.Kamol.SalonSync.payload.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
public class AppointmentResponse {
    private String id;
    private String userId;
    private String salonId;
    private String serviceId;
    private String barberId;
    private String status;
    private Date time;
    private String serviceName;
    private String userName;
    private String userAddress;
    private String userContact;
    private String salonName;
    private Double longitude;
    private Double latitude;

}
