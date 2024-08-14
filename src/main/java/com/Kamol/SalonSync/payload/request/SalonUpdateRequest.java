package com.Kamol.SalonSync.payload.request;

import com.Kamol.SalonSync.models.Barber;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class SalonUpdateRequest {
    private String image;
    private String name;
    private String address;
    private Map<String , Long> priceList = new HashMap<>();
}
