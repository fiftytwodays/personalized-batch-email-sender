package in.fiftytwodays.crm.email.sender.service;

import in.fiftytwodays.crm.email.sender.entity.EmailConfiguration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Component
public class EmailConfigurationHelper {

    public void setEmailConfiguration(JavaMailSender javaMailSender, EmailConfiguration emailConfiguration) {
        JavaMailSenderImpl mailSender = (JavaMailSenderImpl) javaMailSender;
        mailSender.setUsername(emailConfiguration.getUsername());
        mailSender.setPassword(emailConfiguration.getPassword());
        mailSender.setPort(emailConfiguration.getPort());
        mailSender.setHost(emailConfiguration.getHost());
        Properties javaMailProperties = new Properties();
        javaMailProperties.put("mail.smtp.auth", emailConfiguration.isSmtpAuth());
        javaMailProperties.put("mail.smtp.starttls.enable", emailConfiguration.isStartTLSEnable());
        mailSender.setJavaMailProperties(javaMailProperties);
    }
}
