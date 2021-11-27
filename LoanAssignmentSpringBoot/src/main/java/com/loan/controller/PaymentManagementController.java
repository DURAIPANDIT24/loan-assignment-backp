package com.loan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.loan.model.Loan;
import com.loan.model.PaymentSchedule;
import com.loan.services.PaymentManagementService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/payment")
public class PaymentManagementController {

	@Autowired
	PaymentManagementService paymentManagementService;

	@GetMapping("/loan-details/{loanID}")
	private Loan getLoanDetailsForPayment(@PathVariable("loanID") String loanID) {
		return paymentManagementService.getLoanDetailsForPayment(loanID);
	}

	@GetMapping("/loan/payment-schedule/{loanId}")
	private List<PaymentSchedule> getPaymentSchedule(@PathVariable("loanId") String loanId) {
		return paymentManagementService.getPaymentScheduleByLoanId(loanId);
	}

	@PutMapping("/update-payment/{paymentId}")
	private PaymentSchedule updatePaymentStatus(@PathVariable("paymentId") String paymentId) {
		return paymentManagementService.updatePaymentStatus(paymentId);
	}

}
