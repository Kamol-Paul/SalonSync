package com.Kamol.SalonSync.implimentation;

import com.Kamol.SalonSync.models.Appointment;
import com.Kamol.SalonSync.payload.request.GetWayRequest;
import com.Kamol.SalonSync.payload.response.GateWayPayload;
import com.Kamol.SalonSync.services.GateWayServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.UUID;

@Service
public class GateWayServicesImpl implements GateWayServices {

    @Override
    public GetWayRequest sendRequest(String name, String email, Double amount, Appointment appointment)
            throws IOException {
        UUID uuid = UUID.randomUUID();
        String tran_id = "SalonSync" + uuid.toString().replace("_", "x");
        tran_id = tran_id.substring(0, 31);

        GateWayPayload payload = new GateWayPayload();
        payload.setAmount(amount);
        payload.setCus_name(name);
        payload.setCus_phone("01811111111");
        payload.setCus_email(email);
        payload.setTran_id(tran_id);
        payload.setSuccess_url("https://test-23asd1skwwex.miahtrip.com/api/payment/success?appointment_id=" + appointment.getId());

        URL url = new URL("https://sandbox.aamarpay.com/jsonpost.php");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setDoOutput(true);
        String jsonInputString;
        ObjectMapper objectMapper = new ObjectMapper();
        jsonInputString = objectMapper.writeValueAsString(payload);
        System.out.println(jsonInputString);
        DataOutputStream dataOutputStream = new DataOutputStream(con.getOutputStream());
        dataOutputStream.writeBytes(jsonInputString);
        dataOutputStream.flush();
        dataOutputStream.close();

        int resposeCode = con.getResponseCode();
        System.out.println(resposeCode);

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));

        StringBuilder response = new StringBuilder();
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        System.out.println(response);

        GetWayRequest getWayRequest = objectMapper.readValue(response.toString(), GetWayRequest.class);
        return getWayRequest;

    }

    @Override
    public GetWayRequest testRequest() throws IOException {
        UUID uuid = UUID.randomUUID();
        String tran_id = "SalonSync" + uuid.toString().replace("_", "x");
        tran_id = tran_id.substring(0, 31);

        GateWayPayload payload = new GateWayPayload();
        payload.setAmount(10.3);
        payload.setCus_name("kaoml");
        payload.setCus_phone("01811111111");
        payload.setCus_email("ckamol7@gmail.com");
        payload.setTran_id(tran_id);

        URL url = new URL("https://sandbox.aamarpay.com/jsonpost.php");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setDoOutput(true);
        String jsonInputString;
        ObjectMapper objectMapper = new ObjectMapper();
        jsonInputString = objectMapper.writeValueAsString(payload);
        System.out.println(jsonInputString);
        DataOutputStream dataOutputStream = new DataOutputStream(con.getOutputStream());
        dataOutputStream.writeBytes(jsonInputString);
        dataOutputStream.flush();
        dataOutputStream.close();

        int resposeCode = con.getResponseCode();
        System.out.println(resposeCode);

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));

        StringBuilder response = new StringBuilder();
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        System.out.println(response);

        GetWayRequest getWayRequest = objectMapper.readValue(response.toString(), GetWayRequest.class);
        return getWayRequest;

    }
}
// URL url = new URL("http://localhost:5000");
// HttpURLConnection con = (HttpURLConnection) url.openConnection();
// con.setRequestMethod("POST");
// con.setRequestProperty("Content-Type", "application/json");
// con.setDoOutput(true);
// String jsonInputString = "{\"opinion\": \"" + opinion + "\"}";
// System.out.println(jsonInputString);
// DataOutputStream wr = new DataOutputStream(con.getOutputStream());
// wr.writeBytes(jsonInputString);
// wr.flush();
// wr.close();
//
// int responseCode = con.getResponseCode();
// System.out.println("Response Code: " + responseCode);
//
// BufferedReader in = new BufferedReader(new
// InputStreamReader(con.getInputStream()));
// String inputLine;
// StringBuilder response = new StringBuilder();
//
// while ((inputLine = in.readLine()) != null) {
// response.append(inputLine);
// }
// in.close();
//
// System.out.println(response.toString());
//
// return get_double_from_string(response.toString());