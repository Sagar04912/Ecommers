package com.app.ecom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecom.model.Users;
import com.app.ecom.repository.UserRepository;
import com.app.ecom.security.JwtUtil;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Users user) {
		if(userRepository.findByUserName(user.getUsername()).isPresent()) {
			System.out.println("inside register");
			return ResponseEntity.badRequest().body("Username already exsits");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok("User Registered sucessfully");
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Users user){
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		final UserDetails userDatails = (UserDetails) userRepository.findByUserName(user.getUsername()).orElseThrow(()-> new RuntimeException("User not found"));
		String jwt = jwtUtil.generateToken(userDatails.getUsername());
		return ResponseEntity.ok(jwt);
	}

}	