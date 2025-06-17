package es.peenyaa7.weigraph.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class WeightEntryRequest {
    
    @NotNull(message = "'weight' must not be null")
    @Positive(message = "'weight' must be positive")
    private Double weight;

    @NotNull(message = "'date' must not be null")
    private LocalDate date;

}
