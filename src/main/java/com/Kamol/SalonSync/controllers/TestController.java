package com.Kamol.SalonSync.controllers;

import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.security.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@Autowired
	JwtUtils jwtUtils;
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/customer")
	@PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_SALON') or hasRole('ROLE_ADMIN')")
	public String userAccess() {
		return "customer Content.";
	}

	@GetMapping("/salon")
	@PreAuthorize("hasRole('ROLE_SALON')")
	public String salonAccess(HttpServletRequest request) {
		User user = jwtUtils.getUserFromRequest(request);
		System.out.println(user);
		return "SALON Board.";
	}

	@GetMapping("/admin")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}