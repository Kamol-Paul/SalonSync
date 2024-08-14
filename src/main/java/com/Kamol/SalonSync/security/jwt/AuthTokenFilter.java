package com.Kamol.SalonSync.security.jwt;

import com.Kamol.SalonSync.security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class AuthTokenFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(@SuppressWarnings("null") HttpServletRequest request, @SuppressWarnings("null") HttpServletResponse response, @SuppressWarnings("null") FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("inside doFilterInternal");
        System.out.println("request header: " + request.getHeader("Authorization"));
        try {
            String jwt = jwtUtils.parseJwt(request);
            System.out.println("jwt: " + jwt);
            jwtUtils.validateJwtToken(jwt);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                System.out.println("valid jwt token");
                String username = jwtUtils.getUserNameFromJwtToken(jwt);
                System.out.println("username: " + username);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                System.out.println("userDetails: " + userDetails);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());
                System.out.println("authentication: " + authentication);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                System.out.println("authentication: " + authentication);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                System.out.println("invalid jwt token");
            }
        } catch (Exception e) {
//      logger.error("Cannot set user authentication: {}", e);
            logger.error("Cannot set user authentication: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }


}
