package com.Kamol.SalonSync.payload.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ServiceRequest {
    private String name;
    private String cost;
    private String image;
}
