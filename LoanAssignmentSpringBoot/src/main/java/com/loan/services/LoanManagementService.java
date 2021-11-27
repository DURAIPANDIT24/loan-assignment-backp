package com.loan.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
public class LoanManagementService {

	@Autowired
	CustomerRepository customerRepository;

	@Autowired
	LoanRepository loanRepository;

	@Autowired
	PaymentScheduleRepository paymentScheduleRepository;

	private static final Logger logger = LoggerFactory.getLogger(LoanManagementService.class);

	private String generateKey(String prefix) {
		String key = UUID.randomUUID().toString().split("-")[0];
		return prefix + key;
	}

	public List<Loan> getLoansByCustomerId(String customerId) {
		List<Loan> loans = new ArrayList<Loan>();
		loanRepository.findByCustomerId(customerId).forEach(loan -> loans.add(loan));
		logger.info("Getting loan details for existing customer {}", customerId);
		return loans;
	}

	public Loan saveLoan(Loan loan) {

		loan.setPayment(false);
		loan.setLoanId(generateKey("FINZ"));
		try {
			createPaymentSchedule((Loan) loan.clone());
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		logger.info("New Loan {} created for the customer", loan);
		return loanRepository.save(loan);

	}

	private void createPaymentSchedule(Loan loan) {
		String paymentTerm = loan.getPaymentTerm();
		if (paymentTerm.equals("Interest Only")) {
			createInterestOnlySchedule(loan);
		} else if (paymentTerm.equals("Even Principal")) {
			createEvenPrincipalSchedule(loan);
		}
	}

	private void createEvenPrincipalSchedule(Loan loan) {
		List<PaymentSchedule> paymentScheduleList = new ArrayList<PaymentSchedule>();
		int perPaymentPrincipal = loan.getLoanAmount() / loan.getPaymentSchedule();
		for (int i = 1; i <= loan.getPaymentSchedule(); i++) {
			PaymentSchedule paymentSchedule = new PaymentSchedule();
			paymentSchedule.setPaymentId(generateKey("PAY"));
			paymentSchedule.setLoanId(loan.getLoanId());
			paymentSchedule.setPaymentDate(calculatePaymentDate(loan, loan.getPaymentFrequency()));
			paymentSchedule.setPrincipal(loan.getLoanAmount());
			paymentSchedule.setProjectedInterest(calculateInterest(loan, perPaymentPrincipal));
			paymentSchedule.setPaymentStatus("PROJECTED");
			paymentSchedule.setPaymentAmount(paymentSchedule.getProjectedInterest() + perPaymentPrincipal);
			paymentScheduleList.add(paymentSchedule);
		}
		logger.info("Creating Even Principal Schedule for Loan {}", loan);
		paymentScheduleRepository.saveAll(paymentScheduleList);
	}

	private void createInterestOnlySchedule(Loan loan) {
		List<PaymentSchedule> paymentScheduleList = new ArrayList<PaymentSchedule>();
		int netPrincipal = loan.getLoanAmount();
		int perPaymentPrincipal = loan.getLoanAmount() / loan.getPaymentSchedule();
		for (int i = 1; i <= loan.getPaymentSchedule(); i++) {
			PaymentSchedule paymentSchedule = new PaymentSchedule();
			paymentSchedule.setPaymentId(generateKey("PAY"));
			paymentSchedule.setLoanId(loan.getLoanId());
			paymentSchedule.setPaymentDate(calculatePaymentDate(loan, loan.getPaymentFrequency()));
			paymentSchedule.setProjectedInterest(calculateInterest(loan, perPaymentPrincipal));
			if (i == loan.getPaymentSchedule()) {
				paymentSchedule.setPrincipal(netPrincipal);
				paymentSchedule.setPaymentAmount((paymentSchedule.getProjectedInterest()) + (netPrincipal));
			} else {
				paymentSchedule.setPrincipal(0);
				paymentSchedule.setPaymentAmount(paymentSchedule.getProjectedInterest());
			}
			paymentSchedule.setPaymentStatus("PROJECTED");
			paymentScheduleList.add(paymentSchedule);
		}
		logger.info("Creating Interest Only  Schedule for Loan {}", loan);
		paymentScheduleRepository.saveAll(paymentScheduleList);
	}

	private float calculateInterest(Loan loan, int perPaymentPrincipal) {
		float paymentSchedule = loan.getPaymentSchedule();

		float years = loan.getLoanDuration();
		float interestRate = loan.getInterestRate();
		int interestAmount = (int) ((loan.getLoanAmount() * (years / paymentSchedule) * interestRate) / 100);

		return interestAmount;
	}

	private Date calculatePaymentDate(Loan loan, String paymentFrequency) {
		String paymentDate = null;
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		

		Calendar paymentDateCalenar = Calendar.getInstance();
		paymentDateCalenar.setTime(loan.getStartDate());
		switch (paymentFrequency) {
		case "Monthly": {
			paymentDateCalenar.add(Calendar.MONTH, 1);
			paymentDate = "" + paymentDateCalenar.get(Calendar.DATE) + "-"
					+ (paymentDateCalenar.get(Calendar.MONTH) + 1) + "-" + paymentDateCalenar.get(Calendar.YEAR);
			break;
		}
		case "Quarterly": {
			paymentDateCalenar.add(Calendar.MONTH, 3);
			paymentDate = "" + paymentDateCalenar.get(Calendar.DATE) + "-"
					+ (paymentDateCalenar.get(Calendar.MONTH) + 1) + "-" + paymentDateCalenar.get(Calendar.YEAR);
			break;
		}
		case "Half Yearly": {
			paymentDateCalenar.add(Calendar.MONTH, 6);
			paymentDate = "" + paymentDateCalenar.get(Calendar.DATE) + "-"
					+ (paymentDateCalenar.get(Calendar.MONTH) + 1) + "-" + paymentDateCalenar.get(Calendar.YEAR);
			break;
		}
		case "Yearly": {
			paymentDateCalenar.add(Calendar.MONTH, 12);
			paymentDate = "" + paymentDateCalenar.get(Calendar.DATE) + "-"
					+ (paymentDateCalenar.get(Calendar.MONTH) + 1) + "-" + paymentDateCalenar.get(Calendar.YEAR);
			break;
		}

		}
		paymentDate = convertDateFormat(paymentDate);
		
		Date paymentPaydate = null;
		try {
			paymentPaydate = formatter.parse(paymentDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		loan.setStartDate(paymentPaydate);
		return paymentPaydate;
	}

	private String convertDateFormat(String paymentDate) {
		if (paymentDate.charAt(1) == '-') {
			paymentDate = "0" + paymentDate;
		}
		if (paymentDate.charAt(4) == '-') {
			System.out.println(paymentDate.substring(3));
			System.out.println(paymentDate.substring(0, 3));
			paymentDate = paymentDate.substring(0, 3) + "0" + paymentDate.substring(3);
		}
		return paymentDate;
	}

	public Loan approveLoan(String loanId) {
		Optional<Loan> loanapprovedOptional = loanRepository.findById(loanId);
		Loan loan = new Loan();
		if (loanapprovedOptional.isPresent()) {
			loan = loanapprovedOptional.get();
			loan.setPayment(true);
		}
		logger.info("Approved Load Status ", loanId);
		return loanRepository.save(loan);
	}

}
