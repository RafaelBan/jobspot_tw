package com.banrafael.moneyplan.controller;

import com.banrafael.moneyplan.message.response.HomeResponse;
import com.banrafael.moneyplan.repository.JobRepository;
import com.banrafael.moneyplan.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class TestRestAPIs {

	@Autowired
	JobRepository jobRepository;

	@Autowired
	UserRepository userRepository;

	@GetMapping("/func/ping")
	@ResponseStatus(HttpStatus.OK)
	public String userAccess() {
		return "Ping successful!";
	}

	@GetMapping("/func/home")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> homeData() {
		String jobCount = String.valueOf(jobRepository.count());
		String userCount = String.valueOf(userRepository.countByType("user"));
		String recruiterCount = String.valueOf(userRepository.countByType("recruiter"));
		System.out.println(jobCount);
		System.out.println(userCount);
		System.out.println(recruiterCount);
		return ResponseEntity.ok(new HomeResponse(jobCount, userCount, recruiterCount));
	}

}