package es.peenyaa7.weigraph.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    
    @NotNull(message = "'newPassword' is required")
    @NotBlank(message = "'newPassword' cannot be empty")
    private String newPassword;

}
