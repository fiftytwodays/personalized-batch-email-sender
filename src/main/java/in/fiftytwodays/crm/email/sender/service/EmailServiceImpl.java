package in.fiftytwodays.crm.email.sender.service;

import in.fiftytwodays.crm.email.sender.entity.EmailConfiguration;
import in.fiftytwodays.crm.email.sender.entity.EmailDetails;
import jakarta.activation.DataSource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private EmailConfigurationHelper emailConfigurationHelper;

    /**
     * Method to send email
     *
     * @param details
     * @throws MessagingException
     */
    @Override
    public void sendMail(EmailDetails details, EmailConfiguration emailConfiguration) throws MessagingException, IOException {

        emailConfigurationHelper.setEmailConfiguration(javaMailSender, emailConfiguration);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        boolean attachmentsAvailable = details.getAttachments() != null && details.getAttachments().length > 0;
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, attachmentsAvailable);
        mimeMessageHelper.setFrom(emailConfiguration.getUsername(), emailConfiguration.getSender());
        if (StringUtils.hasText(emailConfiguration.getReplyTo())) {
            mimeMessageHelper.setReplyTo(emailConfiguration.getReplyTo());
        }
        mimeMessageHelper.setTo(details.getRecipient());
        mimeMessageHelper.setText(details.getMsgBody(), true);
        mimeMessageHelper.setSubject(details.getSubject());

        // Adding the attachment if available
        if (attachmentsAvailable) {
            for (MultipartFile file : details.getAttachments()) {
                DataSource dataSource = new ByteArrayDataSource(file.getInputStream(), file.getContentType());
                mimeMessageHelper.addAttachment(file.getOriginalFilename(), dataSource);
            }
        }
        // Sending the mail
        javaMailSender.send(mimeMessage);
    }

    @Override
    public void testEmailConfiguration(EmailConfiguration emailConfiguration, String receiver)
            throws MailException {
        emailConfigurationHelper.setEmailConfiguration(javaMailSender, emailConfiguration);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(emailConfiguration.getSender() + " <" + emailConfiguration.getUsername() + ">");
        message.setTo(receiver);
        if (StringUtils.hasText(emailConfiguration.getReplyTo())) {
            message.setReplyTo(emailConfiguration.getReplyTo());
        }
        message.setSubject("Test Connection");
        message.setText("This is a test email for connection testing.");
        javaMailSender.send(message);
    }
}
