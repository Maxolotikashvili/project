import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDown,
  faAnglesUp,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  angleDown: any = faAngleDown;
  angleUp: any = faAngleUp;
  anglesUp: any = faAnglesUp;
  whatsup: any = faWhatsapp;
  userForm!: FormGroup;

  API_URL = 'http://95.216.40.62:5012';

  // UserForm Getter Variables
  Email!: any;
  Phone!: any;
  message!: any;

  // Blank
  blank: boolean = false;

  // FooterForm Getter Variables
  Email_Footer!: any;
  PhoneNumber!: any;
  CompanyName!: any;
  CardNumber!: any;
  Cvv!: any;
  Expiry!: any;
  CardOwner!: any;

  expiryMonthTextField: string = '';
  dateCondition: boolean = false;
  
  // Error
  formErrorMessage: string = '';
  formSuccessMessage: string = '';

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    document.addEventListener('scroll', () => {
      const scrollTop: any = document.documentElement.scrollTop;
      const arrowbox: any = document.querySelector('.arrowbox');

      if (scrollTop <= 845) {
        arrowbox?.classList.add('inactive');
      } else {
        arrowbox?.classList.remove('inactive');
      }
    });

    // UserForm
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: [''],
    });

    this.Email = this.userForm.get('email');
    this.Phone = this.userForm.get('phone');
    this.message = this.userForm.get('message');
  }

  handleScroll() {
    window.scrollTo(0, 0);
  }

  openFooter(condition: string) {
    if (condition === 'open') {
      this.blank = true;

      gsap.from(document.querySelector('.blankbox'), {
        ease: 'power4',
        duration: 0.7,
        y: 500,
      });

    } else {
      this.blank = false;
    }
  }

  // Post Request
  async handleSubmit(e: any) {
    e.preventDefault();

    if (this.userForm.status === 'INVALID') return;

    try {
      const input = {
        email: this.Email.value,
        message: this.message.value,
        phoneNumber: this.Phone.value,
        company: '',
      };

      const response = await fetch(
        `${this.API_URL}/api/Email/SendContactEmail`,
        {
          method: 'POST',
          body: JSON.stringify(input),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Message Sent Successfuly');
        return;
      }

      const responseToJSON = await response.json();

      throw new Error(responseToJSON.message);
    } catch (err: any) {
      let errorMessage = 'Error Occured';
      alert(errorMessage);
    }
  }
}
