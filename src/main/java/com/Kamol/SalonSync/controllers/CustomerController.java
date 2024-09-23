package com.Kamol.SalonSync.controllers;

import com.Kamol.SalonSync.helpers.CustomerHelper;
import com.Kamol.SalonSync.payload.request.ReviewRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    CustomerHelper customerHelper;
    @PostMapping("/give_review")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> postReview(@RequestBody ReviewRequest reviewRequest) {
        return ResponseEntity.ok(customerHelper.postNewReview(reviewRequest));
    }

    @GetMapping("/get_review")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> getReview(HttpServletRequest request){
        return ResponseEntity.ok(customerHelper.getCustomerReview(request));
    }

}
