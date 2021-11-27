export class Loan {
  public loanId: string;
  public customerId: string;
  public loanAmount: number;
  public tradeDate: Date;
  public startDate: Date;
  public maturityDate: Date;
  public loanDuration: number;
  public paymentFrequency: string;
  public paymentSchedule: number;
  public interestRate: number;
  public paymentTerm: string;
  public projectedInterest: number;
  public payment: boolean;
}
