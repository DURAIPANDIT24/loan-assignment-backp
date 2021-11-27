package com.loan.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.loan.model.Loan;

import com.loan.services.LoanManagementService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/loan")
public class LoanManagementController {
	@Autowired
	LoanManagementService loanManagementService;

	@GetMapping("/loans/{customerId}")
	private List<Loan> getLoans(@PathVariable("customerId") String customerId) {
		return loanManagementService.getLoansByCustomerId(customerId);
	}

	@PostMapping("/loan")
	private Loan saveLoan(@RequestBody Loan loan) {
		return loanManagementService.saveLoan(loan);
	}

	@PutMapping("/update-loanstatus/{loanId}")
	private Loan approveLoan(@PathVariable("loanId") String LoanId) {
		return loanManagementService.approveLoan(LoanId);
	}

}