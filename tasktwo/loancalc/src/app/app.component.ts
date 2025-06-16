// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'loancalc';
// }

import { Component } from '@angular/core';
import { LoanCalculatorComponent } from './loan-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoanCalculatorComponent],
  template: `<app-loan-calculator />`
})
export class AppComponent { }
