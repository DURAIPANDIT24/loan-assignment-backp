package com.loan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;

import com.loan.model.PaymentSchedule;

@EnableJpaRepositories 
public interface PaymentScheduleRepository extends CrudRepository<PaymentSchedule, String> {
	List<PaymentSchedule> findByLoanId(String loanId);
}
