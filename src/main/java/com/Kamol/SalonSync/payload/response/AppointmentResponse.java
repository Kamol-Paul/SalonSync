package com.Kamol.SalonSync.payload.response;

import com.Kamol.SalonSync.models.Appointment;
import com.Kamol.SalonSync.repository.SalonRepository;
import com.Kamol.SalonSync.repository.ServiceRepository;
import com.Kamol.SalonSync.repository.UserRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
@Service
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
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
    private String salonName;

}
