package com.Kamol.SalonSync.repository;

import com.Kamol.SalonSync.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String > {
    List<Review> findAllByCustomerId(String customerId);
    List<Review> findAllBySalonId(String salonId);
}
