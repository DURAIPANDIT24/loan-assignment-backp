package com.loan.services;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loan.model.Customer;
import com.loan.repository.CustomerRepository;
import com.loan.repository.LoanRepository;
import com.loan.repository.PaymentScheduleRepository;

@Service
public class CustomerManagementService {

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	LoanRepository loanRepository;

	@Autowired
	PaymentScheduleRepository paymentScheduleRepository;

	private static final Logger logger = LoggerFactory.getLogger(LoanManagementService.class);

	public Customer saveCustomerDetails(Customer customer) {
		customer.setCustomerId(generateKey("CID"));
		return customerRepository.save(customer);

	}

	private String generateKey(String prefix) {
		String key = UUID.randomUUID().toString().split("-")[0];
		return prefix + key;
	}

	public Customer getCustomerDetails(String customerId) {
		logger.info("Getting customer details for {}", customerId);
		return customerRepository.findById(customerId).get();
	}

	public Customer getCustomerDetails(String email, String password) {
		List<Customer> customerList = customerRepository.findByEmailAndPassword(email, password);
		if (customerList.isEmpty()) {
			return new Customer();
		}
		logger.info("Verifying existing customer details for {}", email);
		return customerRepository.findByEmailAndPassword(email, password).get(0);
	}

}
