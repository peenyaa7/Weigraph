package es.peenyaa7.weigraph.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WeightEntriesResponse {
    
    List<WeightEntryResponse> weightEntries;

}
