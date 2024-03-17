package in.fiftytwodays.crm.email.sender.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Contact {
    private String serialNo;

    private String name;

    private String prefix;

    private String nickName;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Email is required")
    private String email;

    private String phoneNo;
}
