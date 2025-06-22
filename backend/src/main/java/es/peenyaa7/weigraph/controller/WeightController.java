package es.peenyaa7.weigraph.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.peenyaa7.weigraph.constants.ApiRoutes;
import es.peenyaa7.weigraph.dto.WeightEntriesResponse;
import es.peenyaa7.weigraph.mapper.WeightMapper;
import es.peenyaa7.weigraph.model.WeightEntry;
import es.peenyaa7.weigraph.service.WeightEntryService;

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

}
