package com.app.ecom.service;

import org.springframework.stereotype.Service;

import com.app.ecom.model.Users;

@Service
public interface UserService {

	Users UsersuserAuthentication(String userName, String password);
	
	public Users createUser(Users user);
}
