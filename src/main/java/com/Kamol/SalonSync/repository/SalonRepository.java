package com.Kamol.SalonSync.repository;

import com.Kamol.SalonSync.models.Salon;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SalonRepository extends MongoRepository<Salon,String > {
    Optional<Salon> findById(String id);
    List<Salon> findAll();
}
