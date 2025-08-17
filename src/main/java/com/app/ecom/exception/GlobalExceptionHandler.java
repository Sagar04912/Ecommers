package com.app.ecom.exception;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.validation.ConstraintViolationException;


@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex){
		Map<String, String> fieldErrors = ex.getBindingResult().getFieldErrors()
				.stream()
				.collect(Collectors.toMap(FieldError :: getField, DefaultMessageSourceResolvable::getDefaultMessage,(a,b)->a));
		Map<String, Object> body = new HashMap<>();
		body.put("message", "Validation field");
		body.put("errors", fieldErrors);
		return ResponseEntity.badRequest().body(body);
	}
	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Map<String, Object>> handleConstraintViolation(ConstraintViolationException ex){
		Map<String, List<String>> violations = ex.getConstraintViolations()
				.stream()
				.collect(Collectors.groupingBy(v -> v.getPropertyPath().toString(),LinkedHashMap::new, Collectors.mapping(cv -> cv.getMessage(), Collectors.toList())));
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("message", "Validation Failed");
		body.put("errors", violations);
		return ResponseEntity.badRequest().body(body);
	}
}
