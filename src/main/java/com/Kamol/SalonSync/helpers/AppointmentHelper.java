package com.Kamol.SalonSync.helpers;

import com.Kamol.SalonSync.models.Appointment;
import com.Kamol.SalonSync.payload.response.AppointmentResponse;
import com.Kamol.SalonSync.repository.SalonRepository;
import com.Kamol.SalonSync.repository.ServiceRepository;
import com.Kamol.SalonSync.repository.UserRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentHelper {
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SalonRepository salonRepository;
    public AppointmentResponse getAppointmentRespose(Appointment appointment){
        AppointmentResponse appointmentResponse = new AppointmentResponse();
        appointmentResponse.setId(appointment.getId());
        appointmentResponse.setUserId(appointment.getUserId());
        appointmentResponse.setSalonId(appointment.getSalonId());
        appointmentResponse.setBarberId(appointment.getBarberId());
        appointmentResponse.setStatus(appointment.getStatus());
        appointmentResponse.setTime(appointment.getTime());
        appointmentResponse.setUserName(userRepository.findById(appointment.getUserId()).get().getUsername());
        appointmentResponse.setServiceName(serviceRepository.findById(appointment.getServiceId()).get().getName());
        appointmentResponse.setSalonName(salonRepository.findById(appointment.getSalonId()).get().getName());
        return appointmentResponse;
    }
    public void sendMessage(String phoneNumber){
        phoneNumber = generateValidNumber(phoneNumber);

    }
    String generateValidNumber(@NotNull String phoneNumber){
        String lastTenDigit = phoneNumber.substring(phoneNumber.length() - 10);
        return "880" + lastTenDigit;
    }
}
