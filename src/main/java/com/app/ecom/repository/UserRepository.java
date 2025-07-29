package com.app.ecom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.ecom.model.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
		
	public Users findUserByUserNameAndPassword(String userName, String password);
	
	public Optional<Users> findByUserName(String userName);
	
}
