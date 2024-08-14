package com.Kamol.SalonSync.models;


import lombok.*;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "appointment")
public class Appointment {
    @Id
    private String id;
    private String userId;
    private String salonId;
    private String serviceId;
    private String barberId;
    private String status;
    private Date time;

}
