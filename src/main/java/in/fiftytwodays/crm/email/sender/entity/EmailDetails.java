package in.fiftytwodays.crm.email.sender.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

// Annotations
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetails {
    // Class data members
    private String recipient;
    private String msgBody;
    private String subject;
    private MultipartFile[] attachments;
}
