package com.Kamol.SalonSync.repository;

import com.Kamol.SalonSync.models.SubscriptionFee;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SubscriptionFeeRepository extends MongoRepository<SubscriptionFee,String> {
    List<SubscriptionFee> findAllBySalonId(String salonId);
}
