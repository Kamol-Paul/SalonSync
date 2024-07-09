package com.Kamol.SalonSync.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Kamol.SalonSync.models.User;
import java.util.Optional;


public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByUsername(String username);
  
    Boolean existsByUsername(String username);
  
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String phoneNumber);

    Optional<User> findByVerificationCode(String verificationCode);
  }
