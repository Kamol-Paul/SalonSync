package com.Kamol.SalonSync.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private ERole name;

}
