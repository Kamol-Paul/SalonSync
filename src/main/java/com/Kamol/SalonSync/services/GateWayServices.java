package com.Kamol.SalonSync.services;

import com.Kamol.SalonSync.models.Appointment;
import com.Kamol.SalonSync.payload.request.GetWayRequest;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.ProtocolException;

public interface GateWayServices {
    GetWayRequest sendRequest(String name, String email, Double amount, Appointment appointment) throws IOException;
    GetWayRequest testRequest() throws IOException;
}
