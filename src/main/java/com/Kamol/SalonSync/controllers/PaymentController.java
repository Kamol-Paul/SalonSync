package com.Kamol.SalonSync.controllers;

import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.security.jwt.JwtUtils;
import com.Kamol.SalonSync.services.GateWayServices;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    GateWayServices gateWayServices;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/success")
    public String success(HttpServletRequest httpServletRequest) {
        System.out.println(httpServletRequest.toString());
        return "";
    }

    @PostMapping("/fail")
    public String fail(HttpServletRequest httpServletRequest) {
        System.out.println(httpServletRequest.toString());
        return "";
    }

    @PostMapping("/cancel")
    public String cancel(HttpServletRequest httpServletRequest) {
        System.out.println(httpServletRequest.toString());
        return "";
    }

    @PostMapping("/make_payment")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> makePayment(HttpServletRequest request) throws IOException {
        User customer = jwtUtils.getUserFromRequest(request);
        return ResponseEntity.ok(gateWayServices.sendRequest(customer.getUsername(), customer.getEmail(), 10.0));
    }

    @PostMapping("/make_test")
    public ResponseEntity<?> makeTest() throws IOException {
        return ResponseEntity.ok(gateWayServices.testRequest());
    }
}
