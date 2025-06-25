package es.peenyaa7.weigraph.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponse {
    
    private Long id;
    private String username;
    private float weightGoal;

}
