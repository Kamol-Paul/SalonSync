package com.Kamol.SalonSync.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Setter
@Getter
@ToString
@Document(collection = "salons")

public class Salon {
    @Id
    private String id;
    @DBRef
    private User owner;
    private String image;
    private String name;
    private String address;
    @DBRef
    private Set<Service> servicesList = new HashSet<>();
    @DBRef
    private Set<Barber> barbers = new HashSet<>();
}