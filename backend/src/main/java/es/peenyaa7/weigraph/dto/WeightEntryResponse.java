package es.peenyaa7.weigraph.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WeightEntryResponse {
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    private Double weight;

}
