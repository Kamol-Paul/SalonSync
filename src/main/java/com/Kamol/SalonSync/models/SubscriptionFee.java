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
@Document(collection = "subscription")
public class SubscriptionFee {
    @Id
    private String id;
    private String salonId;
    private Date time;
}
