package com.Kamol.SalonSync.payload.request;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetWayRequest {
    private Boolean result;
    private String payment_url;
}
