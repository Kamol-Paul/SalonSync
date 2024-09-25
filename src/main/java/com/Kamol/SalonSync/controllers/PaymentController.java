package com.Kamol.SalonSync.controllers;

import com.Kamol.SalonSync.models.Appointment;
import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.repository.AppointmentRepository;
import com.Kamol.SalonSync.security.jwt.JwtUtils;
import com.Kamol.SalonSync.services.GateWayServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    GateWayServices gateWayServices;
    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    JwtUtils jwtUtils;

    // take the value in /success/{value} and return it
    @PostMapping("/success")
    public String success(HttpServletRequest httpServletRequest,
            @RequestParam("appointment_id") String appointment_id) {
        System.out.println(httpServletRequest.toString());
        // Get the appointment from the appointment_id
        Appointment appointment = appointmentRepository.findById(appointment_id).orElse(null);
        if (appointment != null) {
            // Update the appointment status to paid
            appointment.setStatus("new-posted");
            appointmentRepository.save(appointment);
        }
        return "Payment successful!";
    }

    @PostMapping("/fail")
    public String fail(HttpServletRequest httpServletRequest) {
        System.out.println(httpServletRequest.toString());
        return "Payment failed";
    }

    @GetMapping("/fail")
    public String failGet(HttpServletRequest httpServletRequest) {
        System.out.println(httpServletRequest.toString());
        return "Payment failed";
    }

    @PostMapping("/cancel")
    public String cancel(HttpServletRequest httpServletRequest) {
        System.out.println(httpServletRequest.toString());
        return "payment cancelled";
    }

    @GetMapping("/cancel")
    public String cancelGet(HttpServletRequest httpServletRequest) {
        System.out.println(httpServletRequest.toString());
        return "payment cancelled";
    }

    // @PostMapping("/make_payment")
    // @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    // public ResponseEntity<?> makePayment(HttpServletRequest request) throws
    // IOException {
    // User customer = jwtUtils.getUserFromRequest(request);
    // return ResponseEntity.ok(gateWayServices.sendRequest(customer.getUsername(),
    // customer.getEmail(), 10.0));
    // }

    @PostMapping("/make_test")
    public ResponseEntity<?> makeTest() throws IOException {
        return ResponseEntity.ok(gateWayServices.testRequest());
    }
}
