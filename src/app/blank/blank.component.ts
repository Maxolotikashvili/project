import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowDown, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
})
export class BlankComponent implements OnInit {
  userForm!: FormGroup;
  arrowDown: any = faArrowDown;
  xmark: any = faXmark;

  API_URL: string = '';

  // Spinner
  spinnerMode: boolean = false;

  // Getter Variables
  CompanyName!: any;
  Email!: any;
  Phone!: any;
  CardOwner!: any;
  CardNumber!: any;
  Expiry!: any;
  Cvv!: any;

  // Error & Success
  expiryMonthTextField: string = "";
  dateCondition: boolean = false;

  formErrorMessage: string = '';
  formSuccessMessage: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      cardOwner: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      cardNumber: ['', [Validators.required, Validators.min(100000000000), Validators.max(9999999999999999)]],
      expiry: ['', [Validators.required, Validators.pattern('[0-90-9, /]*'), Validators.maxLength(7)]],
      cvv: ['', [Validators.required, Validators.min(100), Validators.max(9999)]],
    });

    // Getters
    this.CompanyName = this.userForm.get('companyName');
    this.Email = this.userForm.get('email');
    this.Phone = this.userForm.get('phone');
    this.CardOwner = this.userForm.get('cardOwner');
    this.CardNumber = this.userForm.get('cardNumber');
    this.Expiry = this.userForm.get('expiry');
    this.Cvv = this.userForm.get('cvv');
  };

  modifyInput(ele: any) {
    if (ele.value.length === 2) ele.value = ele.value + '/';

    let value = ele.value.split("");

    if (value[0] + value[1] > 12 || value[3] + value[4] < 22 || value[3] + value[4] > 25 || value.length < 5 || value.length > 5) {
      this.dateCondition = true;
      this.expiryMonthTextField = "expiry-month-text-field";

    } else {
      this.dateCondition = false
      this.expiryMonthTextField = "";
    }

    if (value.length === 0) { this.dateCondition = false }
  }

  // Post Request
  async handleSubmit(e: any) {
    e.preventDefault();

    this.spinnerMode = true;

    if (this.userForm.status === 'INVALID') return;

    try {
      const currentYearHalfInitials = String(new Date().getFullYear())
        .split('')
        .slice(0, 2)
        .join('');
      const [expirationMonth, expirationYear] = this.Expiry.value.split('/');

      const input = {
        email: this.Email.value,
        phoneNumber: `${this.Phone.value}`,
        company: this.CompanyName.value,
        cardNumber: `${this.CardNumber.value}`,
        cardCVV: `${this.Cvv.value}`,
        cardExpirationDate: expirationMonth.concat(
          '/',
          currentYearHalfInitials.concat(expirationYear)
        ),
        cardHolder: this.CardOwner.value,
      };

      const response = await fetch(`${this.API_URL}/api/Email/SendBuyEmail`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response, response.status);

      if (response.status === 200) {
        this.formErrorMessage = '';
        this.formSuccessMessage = 'Sent Successfully';

        this.spinnerMode = false;
        return;
      }

      const responseToJSON = await response.json();

      throw new Error(responseToJSON.message);
    } catch (err: any) {
      let errorMessage = 'Error Occured';

      switch (err.message) {
        case 'invalid.card.number':
          errorMessage = 'Invalid Card Number';
          break;

        case 'invalid.cvv':
          errorMessage = 'Invalid CVV';
          break;

        case 'invalid.expiration.date':
          errorMessage = 'Invalid Expiration Date';
          break;

        default:
          break;
      }

      this.formSuccessMessage = '';
      this.formErrorMessage = errorMessage;

      this.spinnerMode = false;

      setTimeout(() => {
        this.formErrorMessage = '';
      }, 3000);
    }
  }
}
