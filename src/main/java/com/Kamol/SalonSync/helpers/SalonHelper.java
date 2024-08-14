package com.Kamol.SalonSync.helpers;

import com.Kamol.SalonSync.models.Barber;
import com.Kamol.SalonSync.models.Salon;
import com.Kamol.SalonSync.payload.request.BarberRequest;
import com.Kamol.SalonSync.payload.response.ShopResponse;
import com.Kamol.SalonSync.repository.BarberRepository;
import com.Kamol.SalonSync.repository.SalonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SalonHelper {
    @Autowired
    SalonRepository salonRepository;
    @Autowired
    BarberRepository barberRepository;
    public void updateImage(String id, String image){
        Salon salon = salonRepository.findById(id).get();
        salon.setImage(image);
        salonRepository.save(salon);
    }

    public void updateAddress(String id, String address){
        Salon salon = salonRepository.findById(id).get();
        salon.setAddress(address);
        salonRepository.save(salon);
    }
    public void updateName(String id, String name){
        Salon salon = salonRepository.findById(id).get();
        salon.setName(name);
        salonRepository.save(salon);
    }
    public void updatePriceList(String id, Map<String , Long>priceList){
        Salon salon = salonRepository.findById(id).get();
        Map<String,Long> list = salon.getPriceList();
        if(list == null){
            list = new HashMap<>();
        }
        for(Map.Entry<String ,Long> entry: priceList.entrySet()){
            list.put(entry.getKey(),entry.getValue());
        }
        salon.setPriceList(list);
        salonRepository.save(salon);
    }

    public void addBarber(String id, BarberRequest barberRequest){
        Salon salon = salonRepository.findById(id).get();
        Barber barber = new Barber();
        barber.setName(barberRequest.getName());
        barber.setSkill(barber.getSkill());
        barber.setAvailability(barberRequest.getAvailability());
        barberRepository.save(barber);
        Set<Barber> list = salon.getBarbers();
        if(list == null){
            list = new HashSet<>();
        }
        list.add(barber);
        salon.setBarbers(list);
        salonRepository.save(salon);

    }
    public ResponseEntity<?> getAllShop(){
        List<Salon> allSalons = salonRepository.findAll();
        List<ShopResponse> shopResponseList = new ArrayList<>();
        for (Salon salon: allSalons){
            shopResponseList.add(new ShopResponse(salon));
        }
        return ResponseEntity.ok(shopResponseList);
    }

    public ResponseEntity<?>getOneShop(String id){
        Salon salon = salonRepository.findById(id).get();
        salon.getOwner().setPassword(null);
        salon.getOwner().setResetPasswordToken(null);
        salon.getOwner().setVerificationCode(null);
        return ResponseEntity.ok(salon);
    }
}
