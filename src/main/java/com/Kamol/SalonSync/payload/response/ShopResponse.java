package com.Kamol.SalonSync.payload.response;

import com.Kamol.SalonSync.models.Salon;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor
public class ShopResponse {
    private String id;
    private String name;
    private String address;
    private String image;

    public ShopResponse(Salon salon){
        this.id = salon.getId();
        this.name = salon.getName();
        this.address = salon.getAddress();
        this.image = salon.getImage();
    }

}
