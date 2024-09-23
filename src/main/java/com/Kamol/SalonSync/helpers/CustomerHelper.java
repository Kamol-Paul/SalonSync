package com.Kamol.SalonSync.helpers;

import com.Kamol.SalonSync.models.Review;
import com.Kamol.SalonSync.models.Salon;
import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.payload.request.ReviewRequest;
import com.Kamol.SalonSync.payload.response.ReviewResponse;
import com.Kamol.SalonSync.repository.ReviewRepository;
import com.Kamol.SalonSync.repository.SalonRepository;
import com.Kamol.SalonSync.repository.UserRepository;
import com.Kamol.SalonSync.security.jwt.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CustomerHelper {
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    SalonRepository salonRepository;
    @Autowired
    UserRepository userRepository;

    public Review postNewReview(ReviewRequest reviewRequest){
        Review review = new Review();
        review.setCustomerId(reviewRequest.getCustomerId());
        review.setSalonId(reviewRequest.getSalonId());
        review.setReviewText(reviewRequest.getReviewText());
        review.setDate(new Date());
        review = reviewRepository.save(review);
        System.out.println(review);
        return review;

    }
    public List<ReviewResponse> getCustomerReview(HttpServletRequest request){
        User customer = jwtUtils.getUserFromRequest(request);
        List<Review> allCustomerReview = reviewRepository.findAllByCustomerId(customer.getId());
        List<ReviewResponse> allReviewResponse = new ArrayList<>();
        for(Review review: allCustomerReview){
            allReviewResponse.add(getReviewResponse(review));
        }
        return allReviewResponse;
    }

    ReviewResponse getReviewResponse(Review review){
        ReviewResponse reviewResponse = new ReviewResponse();
        reviewResponse.setId(review.getId());
        reviewResponse.setCustomerId(review.getCustomerId());
        reviewResponse.setSalonId(review.getSalonId());
        reviewResponse.setReviewText(review.getReviewText());
        reviewResponse.setDate(review.getDate());
        User user = userRepository.findById(review.getCustomerId()).get();
        reviewResponse.setCustomerName(user.getUsername());
        Salon salon =  salonRepository.findById(review.getSalonId()).get();
        reviewResponse.setSalonAddress(salon.getAddress());
        reviewResponse.setSalonName(salon.getName());
        return reviewResponse;

    }

    public  List<ReviewResponse> getAllSalonResponse(HttpServletRequest request){
        User salon = jwtUtils.getUserFromRequest(request);
        List<Review> allSalonReview = reviewRepository.findAllBySalonId(salon.getId());
        List<ReviewResponse> allReviewResponse = new ArrayList<>();
        for(Review review: allSalonReview){
            allReviewResponse.add(getReviewResponse(review));
        }
        return allReviewResponse;
    }
}
