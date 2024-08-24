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
@Document(collection = "review")
public class Review {
    @Id
    private String id;
    private String salonId;
    private String customerId;
    private String reviewText;
    private Date date;
}
