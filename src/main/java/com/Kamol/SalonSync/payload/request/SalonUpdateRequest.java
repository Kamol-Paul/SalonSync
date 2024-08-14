package com.Kamol.SalonSync.payload.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class SalonUpdateRequest {
    private String image;
    private String name;
    private String address;
    private Set<ServiceRequest> serviceRequestSet;
}
