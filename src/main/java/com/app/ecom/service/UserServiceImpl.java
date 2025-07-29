package com.app.ecom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.ecom.model.Users;
import com.app.ecom.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Users UsersuserAuthentication(String userName, String password) {
		return userRepo.findUserByUserNameAndPassword(userName, password);
	}

	@Override
	public Users createUser(Users user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepo.save(user);
	}

}
