package com.Kamol.SalonSync.implimentation;

import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.repository.UserRepository;
import com.Kamol.SalonSync.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    UserRepository userRepository;
    @Override
    public void updateResetPasswordToken(String token, String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("Can't find user with this email");
        }
        user.get().setResetPasswordToken(token);
        userRepository.save(user.get());
    }

    @Override
    public void UpdatePassword(String email, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("Can't find user with this email");
        }
        user.get().setPassword(encodedPassword);
        user.get().setResetPasswordToken(null);

        userRepository.save(user.get());
    }

    @Override
    public boolean checkOPT(String email, String OTP) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()){
            throw new UsernameNotFoundException("Can't find user with this email");
        }
        return Objects.equals(user.get().getResetPasswordToken(), OTP);
    }
}
