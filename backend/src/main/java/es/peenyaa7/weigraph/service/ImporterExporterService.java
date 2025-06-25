package es.peenyaa7.weigraph.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.peenyaa7.weigraph.exception.DateParseException;
import es.peenyaa7.weigraph.exception.DuplicateDateCSVException;
import es.peenyaa7.weigraph.exception.InvalidCSVHeaderException;
import es.peenyaa7.weigraph.exception.KgParseException;
import es.peenyaa7.weigraph.model.User;
import es.peenyaa7.weigraph.model.WeightEntry;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ImporterExporterService {

    public static final String DATE_COLUMN_NAME = "date";
    public static final String KG_COLUMN_NAME = "kg";

    @Autowired
    private WeightEntryService weightEntryService;
    
    public void importFromCSV(User user, InputStream csvInputStream, String dateFormat) {

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(csvInputStream, StandardCharsets.UTF_8))) {
            
            CSVParser parser = CSVFormat.DEFAULT.builder()
                .setSkipHeaderRecord(true)
                .setHeader()
                .get().parse(reader);

            Map<String, Integer> headerMap = parser.getHeaderMap();
            if (headerMap.size() != 2 || !headerMap.containsKey(DATE_COLUMN_NAME) || !headerMap.containsKey(KG_COLUMN_NAME)) {
                throw new InvalidCSVHeaderException("CSV file header should be: " + DATE_COLUMN_NAME + ", " + KG_COLUMN_NAME);
            }

            Map<LocalDate, Double> weightsMapToSave = new HashMap<>();

            LocalDate oldestDate = LocalDate.MAX;
            LocalDate newestDate = LocalDate.MIN;
            for (CSVRecord record : parser) {

                LocalDate date = LocalDate.parse(record.get(DATE_COLUMN_NAME), DateTimeFormatter.ofPattern(dateFormat));
                double kg = Double.parseDouble(record.get(KG_COLUMN_NAME));

                if (date.isBefore(oldestDate)) {
                    oldestDate = date;
                }
                if (date.isAfter(newestDate)) {
                    newestDate = date;
                }

                if (!weightsMapToSave.containsKey(date)) {
                    weightsMapToSave.put(date, kg);
                } else {
                    throw new DuplicateDateCSVException("Duplicate date detected: " + date);
                }
            }

            // Save
            List<WeightEntry> weightEntriesToSave = new ArrayList<>();
            for (Map.Entry<LocalDate, Double> entry : weightsMapToSave.entrySet()) {
                WeightEntry weightEntry = new WeightEntry(null, user, entry.getKey(), entry.getValue());
                weightEntriesToSave.add(weightEntry);
            }
            log.info("Saving " + weightsMapToSave.size() + " weights to database...");
            weightEntryService.saveAll(weightEntriesToSave);
            log.info(weightsMapToSave.size() + " weights imported from CSV file to user '" + user.getUsername() + "' (from " + oldestDate + " to " + newestDate + ")");

        } catch (DateTimeParseException e) {
            throw new DateParseException("Invalid 'date' detected value with format " + dateFormat);
        } catch (NumberFormatException e) {
            throw new KgParseException("Invalid 'kg' detected value");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
