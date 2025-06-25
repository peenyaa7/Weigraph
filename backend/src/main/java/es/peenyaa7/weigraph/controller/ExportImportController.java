package es.peenyaa7.weigraph.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import es.peenyaa7.weigraph.constants.ApiRoutes;
import es.peenyaa7.weigraph.model.User;
import es.peenyaa7.weigraph.service.ImporterExporterService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ExportImportController {

    @Autowired
    private ImporterExporterService service;
    
    @PostMapping(value = ApiRoutes.IMPORT_URL, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> importData(
        @RequestParam MultipartFile file,
        @RequestParam(required = false, defaultValue = "dd/MM/yyyy") String dateFormat,
        @AuthenticationPrincipal User currentUser
    ) {

        // Validate if file is not empty
        if (file == null ||file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        // Validate if file is a CSV file
        if (!"text/csv".equals(file.getContentType())) {
            return ResponseEntity.badRequest().body("File is not a CSV file");
        }
    
        try {
            service.importFromCSV(currentUser, file.getInputStream(), dateFormat);
        } catch (IOException e) {
            log.error("Error importing data", e);
            return ResponseEntity.badRequest().body("Error importing data");
        }

        return ResponseEntity.accepted().build();

    }

}
