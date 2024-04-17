package com.example.backend.Config;

import com.example.backend.Exceptions.AppException;
import com.example.backend.dto.ErrorDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RestExceptionHandler {
    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handleException(AppException ex){
        return ResponseEntity.status(ex.getHttpStatus())
                .body(new ErrorDTO(ex.getMessage()));
    }
}
