package es.peenyaa7.weigraph.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import es.peenyaa7.weigraph.constants.ApiRoutes;
import es.peenyaa7.weigraph.constants.DateConstants;
import es.peenyaa7.weigraph.dto.WeightEntriesResponse;
import es.peenyaa7.weigraph.dto.WeightEntryRequest;
import es.peenyaa7.weigraph.mapper.WeightMapper;
import es.peenyaa7.weigraph.model.WeightEntry;
import es.peenyaa7.weigraph.service.WeightEntryService;
import io.micrometer.common.lang.NonNull;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(ApiRoutes.WEIGHTS_URL)
public class WeightController {

    @Autowired
    private WeightEntryService weightEntryService;
    
    @GetMapping
    public ResponseEntity<WeightEntriesResponse> getWeightEntries() {
        List<WeightEntry> weightEntries = weightEntryService.getAll();
        WeightEntriesResponse response = WeightEntriesResponse.builder()
                .weightEntries(weightEntries.stream().map((weightEntry) -> WeightMapper.INSTANCE.weightToWeightEntryResponse(weightEntry)).toList())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createNewWeight(@RequestBody WeightEntryRequest weightEntryRequest) {
        weightEntryService.createOrUpdate(WeightMapper.INSTANCE.weightEntryRequestToWeightEntry(weightEntryRequest));
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/{date}")
    public ResponseEntity<?> deleteWeight(@PathVariable @NonNull String date, @RequestParam(required = false, defaultValue = DateConstants.DEFAULT_DATE_FORMAT) String dateFormat) {
        
        try {
            LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern(dateFormat));
            weightEntryService.removeByDate(parsedDate);
            return ResponseEntity.noContent().build();
        } catch (DateTimeParseException ex) {
            return ResponseEntity.badRequest().body("Specified date cannot be parsed."); // TODO: Change to managed exception
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("Specified dateFormat is invalid."); // TODO: Change to managed exception
        }

    }

}
