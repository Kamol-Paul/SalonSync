package com.Kamol.SalonSync.controllers;

import com.Kamol.SalonSync.helpers.AdminHelper;
import com.Kamol.SalonSync.helpers.SalonHelper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    SalonHelper salonHelper;

    @Autowired
    AdminHelper adminHelper;
    @GetMapping("/get_all_salon")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllSalon(){
        return salonHelper.getAllShop();
    }

    @GetMapping("/get_all_customer")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllCustomers(){
        return ResponseEntity.ok(adminHelper.getAllCustomer());
    }

    @PostMapping("/give_fee")
    @PreAuthorize("hasRole('ROLE_SALON')")
    public ResponseEntity<?> makePayment(HttpServletRequest request){
        return ResponseEntity.ok(adminHelper.givePayment(request));
    }

    @GetMapping("gat_all_subscription_fee")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllSubscriptionFee(){
        return ResponseEntity.ok(adminHelper.getAllSubscriptionFee());
    }
    @GetMapping("gat_latest_subscription_fee")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getLatestSubscriptionFee(){
        return ResponseEntity.ok(adminHelper.getLatestSubscriptionFee());
    }





}
