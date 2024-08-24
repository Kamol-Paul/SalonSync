package com.Kamol.SalonSync.payload.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class ReviewResponse {
    private String id;
    private String salonId;
    private String customerId;
    private String reviewText;
    private Date date;
    private String salonName;
    private String salonAddress;
    private String customerName;
}
