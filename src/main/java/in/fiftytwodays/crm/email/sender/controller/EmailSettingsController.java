package in.fiftytwodays.crm.email.sender.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.fiftytwodays.crm.email.sender.dto.EmailConfigTestRequest;
import in.fiftytwodays.crm.email.sender.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/email-settings")
@Slf4j
public class EmailSettingsController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/test")
    public ResponseEntity<String> testEmailSettings(@RequestBody EmailConfigTestRequest emailConfigTestRequest) {
        String receiver = emailConfigTestRequest.getReceiver();
        String responseBody = "Email successfully send to " + receiver;
        if (!StringUtils.hasText(receiver)) {
            receiver = emailConfigTestRequest.getEmailConfiguration().getUsername();
        }
        try {
            emailService.testEmailConfiguration(emailConfigTestRequest.getEmailConfiguration(), receiver);
        } catch (MailException e) {
            log.error("Error while sending test email", e);
            responseBody = "Email sending failed with reason " + e.getMessage();
        } catch (Exception e) {
            log.error("Error while testing email configuration", e);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Error while testing email configuration with reason " + e.getMessage());
        }
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping()
    public ResponseEntity<EmailConfigTestRequest> getEmailSettings() {
        try {
            return ResponseEntity.ok(readEmailSettings("email-settings.json"));
        } catch (IOException e) {
            log.error("Error while getting email settings", e);
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Error while getting email settings with reason " + e.getMessage());
        }
    }

    private EmailConfigTestRequest readEmailSettings(String filePath) throws IOException {
        String jsonContent = new String(Files.readAllBytes(Paths.get(filePath)));
        return objectMapper.readValue(jsonContent, EmailConfigTestRequest.class);
    }
}
