package in.fiftytwodays.crm.email.sender.service;

import in.fiftytwodays.crm.email.sender.entity.Contact;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public interface ExcelService {

    List<Contact> readExcel(String filePath) throws IOException;

    List<Contact> readExcel(InputStream inputStream) throws IOException;

    void validateExcel(List<Contact> contacts);

}
