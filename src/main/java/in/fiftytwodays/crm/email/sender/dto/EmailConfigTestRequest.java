package in.fiftytwodays.crm.email.sender.dto;

import in.fiftytwodays.crm.email.sender.entity.EmailConfiguration;
import lombok.Data;

@Data
public class EmailConfigTestRequest {
    private EmailConfiguration emailConfiguration;
    private String receiver;
}
