package com.Kamol.SalonSync.controllers;

import com.Kamol.SalonSync.helpers.AppointmentHelper;
import com.Kamol.SalonSync.models.Appointment;
import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.payload.request.AppointmentRequest;
import com.Kamol.SalonSync.payload.request.AppointmentRequestAcceptance;
import com.Kamol.SalonSync.payload.response.AppointmentResponse;
import com.Kamol.SalonSync.repository.AppointmentRepository;
import com.Kamol.SalonSync.security.jwt.JwtUtils;
import com.Kamol.SalonSync.services.EmailService;
import com.Kamol.SalonSync.services.GateWayServices;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    EmailService emailService;

    @Autowired
    GateWayServices gateWayServices;

    @Autowired
    AppointmentHelper appointmentHelper;

    @PostMapping("/new")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> addAppointment(HttpServletRequest request,
            @RequestBody AppointmentRequest appointmentRequest) throws IOException {
        // pay and confirm
        User user = jwtUtils.getUserFromRequest(request);
        Appointment newAppointment = new Appointment();
        newAppointment.setUserId(user.getId());
        newAppointment.setSalonId(appointmentRequest.getSalonId());
        newAppointment.setServiceId(appointmentRequest.getServiceId());
        newAppointment.setLatitude(appointmentRequest.getLatitude());
        newAppointment.setLongitude(appointmentRequest.getLongitude());
        // newAppointment.setStatus("new-posted");
        newAppointment.setStatus("");
        newAppointment = (Appointment) appointmentRepository.save(newAppointment);
        // return ResponseEntity.ok(newAppointment);
        return ResponseEntity
                .ok(gateWayServices.sendRequest(user.getUsername(), user.getEmail(), 10.0, newAppointment));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_SALON')")
    public ResponseEntity<?> getAllAppointment(HttpServletRequest request) {
        User user = jwtUtils.getUserFromRequest(request);
        List<Appointment> allAppointment = appointmentRepository.findAllBySalonId(user.getId());
        // print the size of the list
        System.out.println("---------------------------------------------------------------------------------");
        System.out.println(allAppointment.size());

        List<AppointmentResponse> responseList = new ArrayList<>();
        for (Appointment appointment : allAppointment) {
            responseList.add(appointmentHelper.getAppointmentRespose(appointment));
        }

        return ResponseEntity.ok(allAppointment);
        // return ResponseEntity.ok(responseList);
    }

    @GetMapping("/one/{id}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SALON')")
    public ResponseEntity<?> getOneAppointment(@Param("id") String id) {
        Appointment appointment = appointmentRepository.findById(id).get();
        return ResponseEntity.ok(appointmentHelper.getAppointmentRespose(appointment));

    }

    @PostMapping("/confirm/{id}")
    @PreAuthorize("hasRole('ROLE_SALON')")
    public ResponseEntity<?> confirmAppointment(@Param("id") String id, HttpServletRequest request,
            @RequestBody AppointmentRequestAcceptance appointmentRequestAcceptance) {
        Appointment appointment = appointmentRepository.findById(id).get();
        User user = jwtUtils.getUserFromRequest(request);
        if (user.getId().equals(appointment.getSalonId())) {
            appointment.setStatus("accept-waiting-for-call");
            appointment.setTime(appointmentRequestAcceptance.getDate());
            appointment.setBarberId(appointmentRequestAcceptance.getBarberId());
            appointmentRepository.save(appointment);
        }
        return ResponseEntity.ok(appointmentHelper.getAppointmentRespose(appointment));

    }

    @PostMapping("/reject/{id}")
    @PreAuthorize("hasRole('ROLE_SALON')")
    public ResponseEntity<?> rejectAppointment(@Param("id") String id, HttpServletRequest request) {
        User user = jwtUtils.getUserFromRequest(request);
        Appointment appointment = appointmentRepository.findById(id).get();
        if (user.getId().equals(appointment.getSalonId())) {
            appointment.setStatus("rejected");
            appointment.setTime(new Date());
            appointmentRepository.save(appointment);
        }
        return ResponseEntity.ok(appointmentHelper.getAppointmentRespose(appointment));
    }

    // @GetMapping("/call/{id}")
    // @PreAuthorize("hasRole('ROLE_SALON')")
    // public ResponseEntity<?> callAppointment(@Param("id") String id,
    // HttpServletRequest request){
    // Appointment appointment = appointmentRepository.findById(id).get();
    // User user = jwtUtils.getUserFromRequest(request);
    // if(user.getId().equals(appointment.getSalonId())){
    // appointment.setStatus("called");
    // // mail and message function will be implimented
    // appointment.setTime(new Date());
    // appointmentRepository.save(appointment);
    // emailService.sendCalledMail(appointment);
    //
    //
    // }
    // return
    // ResponseEntity.ok(appointmentHelper.getAppointmentRespose(appointment));
    //
    // }

}
