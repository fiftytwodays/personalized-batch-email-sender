package in.fiftytwodays.crm.email.sender.entity;

import lombok.Data;

@Data
public class EmailConfiguration {
    private String host;
    private int port;
    private String sender;
    private String username;
    private String password;
    private String replyTo;
    private boolean smtpAuth;
    private boolean startTLSEnable;
}
