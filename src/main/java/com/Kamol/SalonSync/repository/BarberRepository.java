package com.Kamol.SalonSync.repository;

import com.Kamol.SalonSync.models.Barber;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BarberRepository extends MongoRepository<Barber, String> {
    Optional<Barber> findById(String id);
}
