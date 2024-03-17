package in.fiftytwodays.crm.email.sender.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.fiftytwodays.crm.email.sender.dto.ReportSendRequest;
import in.fiftytwodays.crm.email.sender.entity.Contact;
import in.fiftytwodays.crm.email.sender.entity.EmailDetails;
import in.fiftytwodays.crm.email.sender.service.EmailService;
import in.fiftytwodays.crm.email.sender.service.ExcelService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/email")
@Slf4j
public class EmailController {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ExcelService excelService;

    @Autowired
    private EmailService emailService;

    private String getFullFilePath(String basePath, String fileName) {
        return Paths.get(basePath + FileSystems.getDefault().getSeparator() + fileName).toString();
    }

    @PostMapping("/send-report")
    public SseEmitter sendReport(ReportSendRequest reportSendRequest, @RequestParam(name = "emailAttachments", required = false) MultipartFile[] emailAttachments) {
        List<Contact> contacts = null;
        try {
            contacts = parseContactsJSON(reportSendRequest.getContacts());
        } catch (JsonProcessingException e) {
            log.error("Error while parsing contacts JSON", e);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Error while parsing contacts data. Reason: " + e.getMessage());
        }
        if (contacts == null || contacts.size() == 0) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Please upload contact list API before calling send API");
        }

        final SseEmitter emitter = new SseEmitter();
        // Async execution
        List<Contact> finalContacts = contacts;
        CompletableFuture.runAsync(() -> {
            try {
                sendEmitterResponse(emitter, "Begin", "Email Sending Started");
                finalContacts.stream().forEach(contact -> {
                    sendEmitterResponse(emitter, contact.getEmail(), "Sending email");
                    try {
                        sendReport(contact, reportSendRequest, emailAttachments);
                        sendEmitterResponse(emitter, contact.getEmail(), "Email sent successfully");
                    } catch (MessagingException | IOException e) {
                        log.error("Email sending failed", e);
                        sendEmitterResponse(emitter, contact.getEmail(), "Email sending failed");
                    } catch (Exception e) {
                        log.error("Error while sending email", e);
                        sendEmitterResponse(emitter, contact.getEmail(), "Error while sending email");
                    }
                });
                sendEmitterResponse(emitter, "End", "Email Sending Finished");
                emitter.complete();
            } catch (Exception e) {
                log.error("Error while sending emails", e);
                emitter.completeWithError(e);
            }
        });

        return emitter;
    }

    private List<Contact> parseContactsJSON(String contactsJSON) throws JsonProcessingException {
        return objectMapper.readValue(contactsJSON, new TypeReference<List<Contact>>() {
        });
    }

    private void sendEmitterResponse(SseEmitter emitter, String eventName, String data) {
        try {
            emitter.send(SseEmitter.event().name(eventName).data(data));
        } catch (IOException e) {
            log.error("Error while sending emitter", e);
            throw new RuntimeException(e);
        }
    }

    private boolean sendReport(Contact contact, ReportSendRequest reportSendRequest, MultipartFile[] emailAttachments) throws MessagingException, IOException {
        String emailAddress = contact.getEmail();
        if (null != emailAddress && !emailAddress.isEmpty()) {
            String prefix = contact.getPrefix();
            String nickName = contact.getNickName();
            EmailDetails emailDetails = new EmailDetails();
            emailDetails.setRecipient(emailAddress);
            emailDetails.setSubject(reportSendRequest.getEmailSubject());
            String emailPayload = reportSendRequest.getEmailBody();
            emailPayload = emailPayload.replace("${prefix}", prefix);
            emailPayload = emailPayload.replace("${nickname}", nickName);
            emailDetails.setMsgBody(emailPayload);
            if (null != emailAttachments && emailAttachments.length > 0) {
                emailDetails.setAttachments(emailAttachments);
            }
            emailService.sendMail(emailDetails, reportSendRequest.getEmailConfiguration());
        } else {
            return false;
        }
        return true;
    }
}
