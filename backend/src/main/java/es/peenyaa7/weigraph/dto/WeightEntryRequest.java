package es.peenyaa7.weigraph.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class WeightEntryRequest {
    
    @NotNull(message = "'weight' must not be null")
    @Positive(message = "'weight' must be positive")
    private Double weight;

    @NotNull(message = "'date' must not be null")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

}
