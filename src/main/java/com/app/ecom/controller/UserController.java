package com.app.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecom.model.Users;
import com.app.ecom.repository.UserRepository;
import com.app.ecom.security.JwtUtil;
import com.app.ecom.service.UserService;

import jakarta.validation.Valid;

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
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@Valid @RequestBody Users user) {
		if(userRepository.findByUserName(user.getUsername()).isPresent()) {
			System.out.println("inside register");
			return ResponseEntity.badRequest().body("Username already exsits");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok("User Registered sucessfully");
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@Valid @RequestBody Users user){
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
		final UserDetails userDatails = (UserDetails) userRepository.findByUserName(user.getUsername()).orElseThrow(()-> new RuntimeException("User not found"));
		System.out.println("inside Login");
		String jwt = jwtUtil.generateToken(userDatails.getUsername());
		System.out.println("inside login1" + jwt);
		return ResponseEntity.ok(jwt);
	}
	
	@GetMapping("/getAllUsers")
	public List<Users> getAllUsers(){
		List<Users> allUsers = userService.getAllUser();
		return allUsers;
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id) {
		if(userRepository.findById(id).isPresent()) {
			userService.deleteUserById(id);
			return ResponseEntity.ok("User deleted successfully");
		}else {
			return ResponseEntity.badRequest().body("User not exsits");
		}
		
	}

}	