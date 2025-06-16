import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.css']
})
export class LoanCalculatorComponent {
  loanAmount: number = 0;
  interestRate: number = 0;
  tenureMonths: number = 0;
  startDate?: string;

  emiResult: {
    monthlyEMI: number;
    totalInterest: number;
    totalPayment: number;
  } | null = null;

  calculateEMI() {
    const P = this.loanAmount;
    const r = this.interestRate / 12 / 100;
    const n = this.tenureMonths;

    if (P <= 0 || r <= 0 || n <= 0) {
      this.emiResult = null;
      return;
    }

    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    this.emiResult = {
      monthlyEMI: emi,
      totalInterest: totalInterest,
      totalPayment: totalPayment
    };
  }
}
