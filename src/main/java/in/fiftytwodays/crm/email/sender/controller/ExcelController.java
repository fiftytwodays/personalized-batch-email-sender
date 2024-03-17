package in.fiftytwodays.crm.email.sender.controller;

import in.fiftytwodays.crm.email.sender.entity.Contact;
import in.fiftytwodays.crm.email.sender.service.ExcelService;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/excel")
@Slf4j
public class ExcelController {

    @Autowired
    private ExcelService excelService;

    @PostMapping("/parse")
    public ResponseEntity<List<Contact>> parseExcel(@RequestParam("file") MultipartFile file) {
        try {
            return getContactsList(file.getInputStream());
        } catch (IOException e) {
            log.error("Error while reading the excel file", e);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Error while reading the excel file, reasons " + e.getMessage(), e);
        }
    }

    @GetMapping("/contacts")
    public ResponseEntity<List<Contact>> getContacts() {
        try (InputStream inputStream = new FileInputStream("contacts.xlsx")) {
            return getContactsList(inputStream);
        } catch (IOException e) {
            log.error("Error while reading the excel file", e);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Error while reading the excel file, reasons " + e.getMessage(), e);
        }
    }

    private ResponseEntity<List<Contact>> getContactsList(InputStream inputStream) {
        List<Contact> contacts = null;
        try {
            contacts = excelService.readExcel(inputStream);
            excelService.validateExcel(contacts);
        } catch (IOException e) {
            log.error("Error while reading the excel file", e);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Error while reading the excel file, reasons " + e.getMessage(), e);
        } catch (ConstraintViolationException | IllegalArgumentException e) {
            log.error("Error while validating the excel file", e);
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
        return ResponseEntity.ok(contacts);
    }
}
