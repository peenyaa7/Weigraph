package es.peenyaa7.weigraph.dto;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {
    
    private UUID id;
    private String username;
    private float weightGoal;

}
