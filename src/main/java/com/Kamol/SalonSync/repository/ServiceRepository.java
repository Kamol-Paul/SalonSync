package com.Kamol.SalonSync.repository;

import com.Kamol.SalonSync.models.Service;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ServiceRepository extends MongoRepository<Service,String > {
    @Override
    Optional<Service> findById(String id);
}
