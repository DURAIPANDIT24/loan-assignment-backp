package com.loan.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table
public class Loan implements Cloneable { 
	@Id
	@Column
	private String loanId;
	@Column
	private String customerId;
	@Column
	private int loanAmount;
	@Column
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date tradeDate;
	@Column
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date startDate;
	@Column
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date maturityDate;
	@Column
	private int loanDuration;
	@Column
	private String paymentFrequency;
	@Column
	private int paymentSchedule;
	@Column
	private float interestRate;
	@Column
	private String paymentTerm;
	@Column
	private int projectedInterest;
	@Column
	private boolean payment;

	public boolean isPayment() {
		return payment;
	}

	public void setPayment(boolean payment) {
		this.payment = payment;
	}

	public String getLoanId() {
		return loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public int getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(int loanAmount) {
		this.loanAmount = loanAmount;
	}

	

	public Date getTradeDate() {
		return tradeDate;
	}

	public void setTradeDate(Date tradeDate) {
		this.tradeDate = tradeDate;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getMaturityDate() {
		return maturityDate;
	}

	public void setMaturityDate(Date maturityDate) {
		this.maturityDate = maturityDate;
	}

	public int getLoanDuration() {
		return loanDuration;
	}

	public void setLoanDuration(int loanDuration) {
		this.loanDuration = loanDuration;
	}

	public String getPaymentFrequency() {
		return paymentFrequency;
	}

	public void setPaymentFrequency(String paymentFrequency) {
		this.paymentFrequency = paymentFrequency;
	}

	public int getPaymentSchedule() {
		return paymentSchedule;
	}

	public void setPaymentSchedule(int paymentSchedule) {
		this.paymentSchedule = paymentSchedule;
	}

	public float getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(float interestRate) {
		this.interestRate = interestRate;
	}

	public String getPaymentTerm() {
		return paymentTerm;
	}

	public void setPaymentTerm(String paymentTerm) {
		this.paymentTerm = paymentTerm;
	}

	public int getProjectedInterest() {
		return projectedInterest;
	}

	public void setProjectedInterest(int projectedInterest) {
		this.projectedInterest = projectedInterest;
	}
	
	public Object clone() throws CloneNotSupportedException
    {
        return super.clone();
    }

}
