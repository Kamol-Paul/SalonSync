package com.Kamol.SalonSync.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Optional;

import com.Kamol.SalonSync.models.Salon;
import com.Kamol.SalonSync.payload.request.ForgetPassword;
import com.Kamol.SalonSync.repository.SalonRepository;
import com.Kamol.SalonSync.services.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Kamol.SalonSync.models.ERole;
import com.Kamol.SalonSync.models.Role;
import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.payload.request.LoginRequest;
import com.Kamol.SalonSync.payload.request.SignupRequest;
import com.Kamol.SalonSync.payload.response.JwtResponse;
import com.Kamol.SalonSync.payload.response.MessageResponse;
import com.Kamol.SalonSync.repository.RoleRepository;
import com.Kamol.SalonSync.repository.UserRepository;
import com.Kamol.SalonSync.security.jwt.JwtUtils;
import com.Kamol.SalonSync.security.services.UserDetailsImpl;
import com.Kamol.SalonSync.services.EmailService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	BCryptPasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired 
	private EmailService emailService;

	@Autowired
	CustomerService customerService;
	@Autowired
	SalonRepository salonRepository;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
		Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
		if(user.isPresent()){
			if(!user.get().getEnable()){
				return ResponseEntity.badRequest().body("Account is not enabled.");
			}
		}
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles,
                                                 userDetails.getPhoneNumber()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, HttpServletRequest request) {
		String url = request.getRequestURL().toString();
		url = url.replace(request.getServletPath(), "");
	
		System.out.println(signUpRequest);
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}
		System.out.println("Here");
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

        if(userRepository.existsByPhoneNumber(signUpRequest.getPhoneNumber())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Phone number is already in use!"));
        }

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()),signUpRequest.getPhoneNumber());

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "salon":
					Role modRole = roleRepository.findByName(ERole.ROLE_SALON)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_CUSTOMER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		user.setEnable(false);
		user.setVerificationCode(UUID.randomUUID().toString());
		user.setRoles(roles);
		user = userRepository.save(user);

        emailService.sendSimpleMail(user, url);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	@GetMapping("/verify")
	public ResponseEntity<?> verifyAccount(@Param("code") String code) {
		System.out.print(code);
		Optional<User> user = userRepository.findByVerificationCode(code);

		if (user.isEmpty()) {
			return ResponseEntity.badRequest().body("Verification code is false or already validated.");
		} 

		user.get().setEnable(true);
		user.get().setVerificationCode(null);

		userRepository.save(user.get());
		Role salonRole = roleRepository.findByName(ERole.ROLE_SALON).get();
		Set<Role> userRoles = user.get().getRoles();
		for(Role role: userRoles){
			if(role.getName().equals(salonRole.getName())){
				Salon salon = new Salon();
				salon.setId(user.get().getId());
				salon.setOwner(user.get());
				salonRepository.save(salon);
			}
		}

		return ResponseEntity.ok(new MessageResponse("Account verified."));
		
	}

	@PostMapping("/forgetPassword")
	public String processForgotPassword(@RequestBody ForgetPassword forgetPassword, HttpServletRequest request) {
		String email = forgetPassword.getEmail();
		System.out.println(request);
		String token = UUID.randomUUID().toString();
		token = token.substring(0,4);
		System.out.println(email);
		System.out.println(token);

		try {
			customerService.updateResetPasswordToken(token, email);
			emailService.sendMail(email,token);

		} catch (Exception e) {
            throw new RuntimeException(e);
        }

		return "We have sent a reset password link to your mail. Please check.";
    }
	@PostMapping("/checkOTP")
	public boolean checkOTP(@RequestBody ForgetPassword forgetPassword){
		return customerService.checkOPT(forgetPassword.getEmail(), forgetPassword.getOpt());
	}

	@PostMapping("/updatePassword")
	public boolean updatePassword(@RequestBody ForgetPassword forgetPassword){
		if(customerService.checkOPT(forgetPassword.getEmail(), forgetPassword.getOpt())){
			customerService.UpdatePassword(forgetPassword.getEmail(), forgetPassword.getNewPassword());
			return true;
		}
		return  false;
	}
}