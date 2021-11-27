package com.loan.services;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loan.model.Loan;
import com.loan.model.PaymentSchedule;
import com.loan.repository.CustomerRepository;
import com.loan.repository.LoanRepository;
import com.loan.repository.PaymentScheduleRepository;

@Service
public class PaymentManagementService {

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	LoanRepository loanRepository;

	@Autowired
	PaymentScheduleRepository paymentScheduleRepository;

	private static final Logger logger = LoggerFactory.getLogger(LoanManagementService.class);
	
	public Loan getLoanDetailsForPayment(String loanId) {
		logger.info("Getting loan details for payment screen{}", loanId);
		return loanRepository.findById(loanId).get();
	}

	public List<PaymentSchedule> getPaymentScheduleByLoanId(String loanId) {
		logger.info("Getting Payment Schedule for Loan{}", loanId);
		return paymentScheduleRepository.findByLoanId(loanId);
	}

	public PaymentSchedule updatePaymentStatus(String paymentId) {
		Optional<PaymentSchedule> paymentScheduleOptional = paymentScheduleRepository.findById(paymentId);
		PaymentSchedule paymentSchedule = new PaymentSchedule();
		if (paymentScheduleOptional.isPresent()) {
			paymentSchedule = paymentScheduleOptional.get();
			paymentSchedule.setPaymentStatus("PAID");
		}
		logger.info("Updating payment status for payment schedule {}", paymentId);
		return paymentScheduleRepository.save(paymentSchedule);
	}
}
