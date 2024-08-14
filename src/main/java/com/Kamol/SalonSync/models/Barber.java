package com.Kamol.SalonSync.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@ToString
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "barbers")
public class Barber {
    @Id
    private String id;
    private String name;
    private String skill;
    private Set<String> availability = new HashSet<>();

}

