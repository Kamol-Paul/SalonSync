package com.Kamol.SalonSync.payload.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class GateWayPayload {
//            "store_id": "aamarpaytest",
//            "tran_id": "123123173",
//            "success_url": "http://www.merchantdomain.com/suc esspage.html",
//            "fail_url": "http://www.merchantdomain.com/faile dpage.html",
//            "cancel_url": "http://www.merchantdomain.com/can cellpage.html",
//            "amount": "10.0",
//            "currency": "BDT",
//            "signature_key": "dbb74894e82415a2f7ff0ec3a97e4183",
//            "desc": "Merchant Registration Payment",
//            "cus_name": "Name",
//            "cus_email": "payer@merchantcusomter.com",,
//            "cus_postcode": "1206",
//            "cus_phone": "+8801704",
//            "type": "json"

    private String store_id = "aamarpaytest";
    private String tran_id;
    private String success_url = "https://localhost:8080/api/payment/success";
    private String fail_url = "https://localhost:8080/api/payment/fail";
    private String cancel_url = "https://localhost:8080/api/payment/cancel";
    private double amount;
    private String currency = "BDT";
    private String signature_key = "dbb74894e82415a2f7ff0ec3a97e4183";
    private String desc = "SalonSync Payment";
    private String cus_name;
    private String cus_email;
    private String cus_phone;
    private String type = "json";

}
