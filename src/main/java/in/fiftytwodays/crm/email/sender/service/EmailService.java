package in.fiftytwodays.crm.email.sender.service;


import in.fiftytwodays.crm.email.sender.entity.EmailConfiguration;
import in.fiftytwodays.crm.email.sender.entity.EmailDetails;
import jakarta.mail.MessagingException;
import org.springframework.mail.MailException;

import java.io.IOException;

public interface EmailService {

    void sendMail(EmailDetails details, EmailConfiguration emailConfiguration) throws MessagingException, IOException;

    void testEmailConfiguration(EmailConfiguration emailConfiguration, String receiver) throws MailException;
}
