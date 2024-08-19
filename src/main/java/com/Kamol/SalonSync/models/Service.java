package com.Kamol.SalonSync.models;

import lombok.*;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "services")
public class Service {
    @Id private String id;
    private String name;
    private Long cost;
    private String image;

}
