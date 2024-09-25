package com.Kamol.SalonSync.helpers;

import com.Kamol.SalonSync.models.Appointment;
import com.Kamol.SalonSync.models.Salon;
import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.payload.response.AppointmentResponse;
import com.Kamol.SalonSync.repository.AppointmentRepository;
import com.Kamol.SalonSync.repository.SalonRepository;
import com.Kamol.SalonSync.repository.ServiceRepository;
import com.Kamol.SalonSync.repository.UserRepository;
import com.Kamol.SalonSync.services.EmailService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AppointmentHelper {
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    SalonRepository salonRepository;

    @Autowired
    EmailService emailService;

    public AppointmentResponse getAppointmentRespose(Appointment appointment) {
        AppointmentResponse appointmentResponse = new AppointmentResponse();
        appointmentResponse.setId(appointment.getId());
        appointmentResponse.setUserId(appointment.getUserId());
        appointmentResponse.setSalonId(appointment.getSalonId());
        appointmentResponse.setBarberId(appointment.getBarberId());
        appointmentResponse.setStatus(appointment.getStatus());
        appointmentResponse.setTime(appointment.getTime());
        User user = userRepository.findById(appointment.getUserId()).get();
        Salon salon = salonRepository.findById(appointment.getSalonId()).get();
        appointmentResponse.setUserName(user.getUsername());
        appointmentResponse.setServiceName(serviceRepository.findById(appointment.getServiceId()).get().getName());
        appointmentResponse.setSalonName(salon.getName());
        appointmentResponse.setUserAddress(user.getAddress());
        appointmentResponse.setUserContact(user.getPhoneNumber());
        appointmentResponse.setLongitude(appointment.getLongitude());
        appointmentResponse.setLatitude(appointment.getLatitude());
        return appointmentResponse;
    }

    public void sendMessage(String phoneNumber) {
        phoneNumber = generateValidNumber(phoneNumber);

    }

    String generateValidNumber(@NotNull String phoneNumber) {
        String lastTenDigit = phoneNumber.substring(phoneNumber.length() - 10);
        return "880" + lastTenDigit;
    }

    @Scheduled(fixedDelay = 60000)
    public void callPublic() {
        System.out.println("in the schedule");
        Date time = new Date();
        List<Appointment> allAppointment = appointmentRepository.findAll();
        for (Appointment appointment : allAppointment) {
            if (appointment.getStatus().equals("accept-waiting-for-call")) {
                if (appointment.getTime().before(time)) {
                    appointment.setStatus("called");
                    appointmentRepository.save(appointment);
                    emailService.sendCalledMail(appointment);
                }
            }
        }
    }
}
