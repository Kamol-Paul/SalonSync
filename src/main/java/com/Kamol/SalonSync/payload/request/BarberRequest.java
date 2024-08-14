package com.Kamol.SalonSync.payload.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;
@NoArgsConstructor
@ToString
@Getter
@Setter
public class BarberRequest {
    private String name;
    private String skill;
    private Set<String> availability;
}
