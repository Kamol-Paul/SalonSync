package com.Kamol.SalonSync.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.Kamol.SalonSync.models.Role;
import com.Kamol.SalonSync.models.ERole;



public interface RoleRepository extends MongoRepository<Role,String>{

    Optional<Role>  findByName(ERole name);
} 
 