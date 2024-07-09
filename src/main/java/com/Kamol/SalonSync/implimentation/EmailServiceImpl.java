package com.Kamol.SalonSync.implimentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

import com.Kamol.SalonSync.models.User;
import com.Kamol.SalonSync.services.EmailService;

@Service
public class EmailServiceImpl implements EmailService {     
    @Autowired
    JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

        public void sendSimpleMail(User user, String url){

            String from = "chobichokro@gmail.com";
            String to = user.getEmail();
            String subject = "Account Verfication";
            String content = "Dear [[name]],<br>" + "Please click the link below to verify your registration:<br>"
                    + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>" + "Thank you,<br>" + "SalonSync";
            
            try {
                MimeMessage message = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message);
                helper.setFrom(from, "SalonSync");
                helper.setTo(to);
                helper.setSubject(subject);

                content = content.replace("[[name]]", user.getUsername());
			    String siteUrl = url + "/api/auth" +
                                        "/verify?code=" + user.getVerificationCode();

			    System.out.println(siteUrl);

			    content = content.replace("[[URL]]", siteUrl);

			    helper.setText(content, true);
                javaMailSender.send(message);
                
            } catch (Exception e) {
                e.printStackTrace();
            }


        }
}
