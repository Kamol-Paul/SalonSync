package com.Kamol.SalonSync.repository;

import com.Kamol.SalonSync.models.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment,String> {
    List<Appointment> findAllBySalonId(String salonId);

}
