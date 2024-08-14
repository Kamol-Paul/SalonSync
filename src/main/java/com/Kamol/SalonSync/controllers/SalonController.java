package com.Kamol.SalonSync.controllers;


import com.Kamol.SalonSync.helpers.SalonHelper;
import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.payload.request.BarberRequest;
import com.Kamol.SalonSync.payload.request.SalonUpdateRequest;
import com.Kamol.SalonSync.security.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/salon")
public class SalonController {
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    SalonHelper salonHelper;

    @PutMapping("/update_image")
    @PreAuthorize("hasRole('ROLE_SALON')")
    public ResponseEntity<?> updateImage(HttpServletRequest request, @RequestBody SalonUpdateRequest salonUpdateRequest){
        User owner = jwtUtils.getUserFromRequest(request);
        salonHelper.updateImage(owner.getId(), salonUpdateRequest.getImage());
        return ResponseEntity.ok("Image updateed");
    }

    @PutMapping("/update_name")
    @PreAuthorize("hasRole('ROLE_SALON')")
    public ResponseEntity<?> updateName(HttpServletRequest request, @RequestBody SalonUpdateRequest salonUpdateRequest){
        User owner = jwtUtils.getUserFromRequest(request);
        salonHelper.updateName(owner.getId(), salonUpdateRequest.getName());
        return ResponseEntity.ok("Name updated");
    }

    @PutMapping("/update_address")
    @PreAuthorize("hasRole('ROLE_SALON')")
    public ResponseEntity<?> updateAddress(HttpServletRequest request, @RequestBody SalonUpdateRequest salonUpdateRequest){
        User owner = jwtUtils.getUserFromRequest(request);
        salonHelper.updateAddress(owner.getId(), salonUpdateRequest.getAddress());
        return ResponseEntity.ok("Address updated");
    }

    @PutMapping("/update_services")
    @PreAuthorize("hasRole('ROLE_SALON')")
    public ResponseEntity<?> updatePriceList(HttpServletRequest request, @RequestBody SalonUpdateRequest salonUpdateRequest){
        User owner = jwtUtils.getUserFromRequest(request);
        salonHelper.updatePriceList(owner.getId(), salonUpdateRequest.getServiceRequestSet());
        return ResponseEntity.ok("Services updated");
    }

    @PutMapping("/add_barber")
    @PreAuthorize("hasRole('ROLE_SALON')")
    ResponseEntity<?> addBarber(HttpServletRequest request, @RequestBody BarberRequest barberRequest){
        User owner = jwtUtils.getUserFromRequest(request);
        salonHelper.addBarber(owner.getId(), barberRequest);
        return ResponseEntity.ok("New Barber added");
    }

    @GetMapping("/all")
    public  ResponseEntity<?> getAll(){
        return salonHelper.getAllShop();
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<?> getOne(@Param("id") String id){
        return salonHelper.getOneShop(id);
    }


}
