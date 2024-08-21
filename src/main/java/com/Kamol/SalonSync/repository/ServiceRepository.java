package com.Kamol.SalonSync.repository;

import com.Kamol.SalonSync.models.Service;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ServiceRepository extends MongoRepository<Service,String > {
}
