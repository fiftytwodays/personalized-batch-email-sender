package in.fiftytwodays.crm.email.sender.dto;

import in.fiftytwodays.crm.email.sender.entity.EmailConfiguration;
import lombok.Data;

@Data
public class ReportSendRequest {
    private String emailSubject;
    private String emailBody;
    private EmailConfiguration emailConfiguration;
    private String contacts;
}
