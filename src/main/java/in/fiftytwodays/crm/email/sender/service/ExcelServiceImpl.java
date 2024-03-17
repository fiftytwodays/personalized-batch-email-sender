package in.fiftytwodays.crm.email.sender.service;

import in.fiftytwodays.crm.email.sender.entity.Contact;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class ExcelServiceImpl implements ExcelService {
    Row.MissingCellPolicy MISSING_CELL_POLICY = Row.MissingCellPolicy.CREATE_NULL_AS_BLANK;

    @Autowired
    private Validator validator;

    @Override
    public List<Contact> readExcel(String filePath) throws IOException {
        File file = new File(filePath);
        return readExcel(new FileInputStream(file));
    }

    @Override
    public List<Contact> readExcel(InputStream inputStream) throws IOException {
        List<Contact> contacts = new ArrayList<>();
        try (Workbook workbook = WorkbookFactory.create(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            // Skip header row
            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Iterator<Cell> cellIterator = row.cellIterator();

                Contact contact = new Contact();
                int i = 0;
                contact.setSerialNo(row.getCell(i++, MISSING_CELL_POLICY).toString());
                contact.setName(row.getCell(i++, MISSING_CELL_POLICY).toString());
                contact.setPrefix(row.getCell(i++, MISSING_CELL_POLICY).toString());
                contact.setNickName(row.getCell(i++, MISSING_CELL_POLICY).toString());
                contact.setEmail(row.getCell(i++, MISSING_CELL_POLICY).toString());
                contact.setPhoneNo(row.getCell(i++, MISSING_CELL_POLICY).toString());

                contacts.add(contact);
            }
        }
        return contacts;
    }

    @Override
    public void validateExcel(List<Contact> contacts) {
        if (contacts.size() == 0) {
            throw new IllegalArgumentException("No contact information provided to send reports");
        }
        contacts.forEach(this::validateContact);
    }

    private void validateContact(Contact contact) {
        Set<ConstraintViolation<Contact>> violations = validator.validate(contact);
        if (!violations.isEmpty()) {
            log.error("Violations: {}", violations);
            throw new ConstraintViolationException(violations);
        }
    }
}
