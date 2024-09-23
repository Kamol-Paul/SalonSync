package com.Kamol.SalonSync.helpers;

import com.Kamol.SalonSync.models.*;
import com.Kamol.SalonSync.repository.AppointmentRepository;
import com.Kamol.SalonSync.repository.SalonRepository;
import com.Kamol.SalonSync.repository.SubscriptionFeeRepository;
import com.Kamol.SalonSync.repository.UserRepository;
import com.Kamol.SalonSync.security.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
@Service
public class AdminHelper {
    @Autowired
    UserRepository userRepository;
    @Autowired
    SubscriptionFeeRepository subscriptionFeeRepository;
    @Autowired
    SalonRepository salonRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    JwtUtils jwtUtils;
    public List<User> getAllCustomer(){
        List<User> allUser = userRepository.findAll();
        ERole customer = ERole.ROLE_CUSTOMER;
        List<User> forReturn = new ArrayList<>();
       for(User user: allUser){
            for(Role role: user.getRoles()){
                if(role.getName().equals(customer)){
                    user.setPassword(null);
                    forReturn.add(user);
                    break;
                }
            }
        }
        return forReturn;
    }

    public SubscriptionFee givePayment(HttpServletRequest request){
        String salonId = jwtUtils.getUserFromRequest(request).getId();
        SubscriptionFee subscriptionFee = new SubscriptionFee();
        subscriptionFee.setSalonId(salonId);
        subscriptionFee.setTime(new Date());
        subscriptionFeeRepository.save(subscriptionFee);
        return subscriptionFee;
    }

    public List<SubscriptionFee> getAllSubscriptionFee(){
        return subscriptionFeeRepository.findAll();
    }

    public HashMap<String, SubscriptionFee> getLatestSubscriptionFee(){
        HashMap<String, SubscriptionFee> latestFee = new HashMap<>();
        List<SubscriptionFee> allSubscriptionFee = getAllSubscriptionFee();


        for(SubscriptionFee subscriptionFee: allSubscriptionFee){
            if(!latestFee.containsKey(subscriptionFee.getSalonId())){
               latestFee.put(subscriptionFee.getSalonId(), subscriptionFee);
            }else {
                if(latestFee.get(subscriptionFee.getSalonId()).getTime().before(subscriptionFee.getTime())){
                    latestFee.put(subscriptionFee.getSalonId(),subscriptionFee);
                }
            }
        }
        List<Salon> allSalon = salonRepository.findAll();
        for(Salon salon: allSalon){
            if(!latestFee.containsKey(salon.getId())){
                latestFee.put(salon.getId(), null);
            }
        }
        return latestFee;

    }

    public int getAllAppointment(Date from, Date to){
        List<Appointment> appointments = appointmentRepository.findAll();
        int ans = 0;
        for(Appointment appointment : appointments){
            if(appointment.getTime().before(to) && appointment.getTime().after(from)){
                ans++;
            }
        }
        return ans;
    }

}

