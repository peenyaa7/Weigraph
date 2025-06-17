package es.peenyaa7.weigraph.exception;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFoundException(UserNotFoundException ex) {
        List<String> errors = Collections.singletonList(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(getErrorsMap(errors));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult().getFieldErrors().stream().map(FieldError::getDefaultMessage).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(getErrorsMap(errors));
    }
    
    @ExceptionHandler({RuntimeException.class, Exception.class})
    public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
        List<String> errors = Collections.singletonList(ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(getErrorsMap(errors));
    }

    private Map<String, List<String>> getErrorsMap(List<String> errors) {
        Map<String, List<String>> errorsMap = new HashMap<>();
        errorsMap.put("errors", errors);
        return errorsMap;
    }

}
