 import './App.css';
 import { useState } from 'react';


 export default function App() {
  const [monthlyPayment,setMonthlyPayment]=useState('');
  const [totalPayment,setTotalPayment]=useState('');
  const [totalInterest,setTotalInterest]=useState('');
  function onSubmit(event) {
    event.preventDefault(); // Prevent page reload on form submission.
   
  const data = new FormData(event.target);

  // Get and convert input values.
  const loanAmount = parseFloat(data.get('loan-amount'));
  const monthlyInterestRate =
    parseFloat(data.get('interest-rate')) / 100 / 12;
  const loanTermInMonths =
    parseFloat(data.get('loan-term')) * 12;

  // Calculate monthly mortgage payment.
  const monthlyPaymentAmount =
    (loanAmount * monthlyInterestRate) /
    (1 -
      1 /
        Math.pow(
          1 + monthlyInterestRate,
          loanTermInMonths,
        ));
  const totalPayment =
    monthlyPaymentAmount * loanTermInMonths;

  const currencyFormatter = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
    },
  );
  setMonthlyPayment(
    currencyFormatter.format(monthlyPaymentAmount),
  );

  // Display total payment amount.
  setTotalPayment(currencyFormatter.format(totalPayment));

  // Display total interest amount.
  setTotalInterest(
    currencyFormatter.format(totalPayment - loanAmount),
  );
    

  }
  return (
    <div className='mortage-calculter'> 
    <form className='mortage-calculater-form' onSubmit={onSubmit}>   
      <label>
      Loan Amount:{' '}

      <input type="number"   name="loan-amount"defaultValue="10000" min="1"  required/>
      </label>
      <label>
      Loan Term (years):{' '}
      <input type="number"  name='loan-term' defaultValue="30"  min='0.01' step= "0.01"required/>
      </label>
      <label>
      Interest Rate (%):{' '}
      <input type="number"  name='interest-rate' defaultValue="3"  min='0.01' step= "0.01"required/>
      </label>
      <div>
        <button type='submit'>Calculate</button>
      </div>
    </form>
    <hr />
      <div
        aria-live="polite"
        className="mortgage-calculator-results">
        <div>
          Monthly Payment Amount:{' '}
          <strong>{monthlyPayment}</strong>
        </div>
        <div>
          Total Payment Amount:{' '}
          <strong>{totalPayment}</strong>
        </div>
        <div>
          Total Interest Paid:{' '}
          <strong>{totalInterest}</strong>
        </div>
      </div>
    </div>
  );
}
