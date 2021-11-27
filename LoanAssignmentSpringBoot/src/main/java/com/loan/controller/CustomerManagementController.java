package com.loan.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.loan.model.Customer;
import com.loan.services.CustomerManagementService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/customer")
public class CustomerManagementController {

	@Autowired
	CustomerManagementService customerManagementService;

	@GetMapping("/customer/{customerId}")
	private Customer getCustomerDetails(@PathVariable("customerId") String customerId) {
		return customerManagementService.getCustomerDetails(customerId);
	}

	@GetMapping("/verify-customer")
	private Customer verifyCustomer(@RequestParam("email") String email, @RequestParam("password") String password) {
		return customerManagementService.getCustomerDetails(email, password);
	}

	@PostMapping("/add-customer")
	private Customer saveCustomer(@RequestBody Customer customer) {
		return customerManagementService.saveCustomerDetails(customer);
	}

}
