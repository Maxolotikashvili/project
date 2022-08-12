import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  arrow: any = faAngleUp;
  userForm!: FormGroup;

  API_URL = 'http://95.216.40.62:5012';

  // Getter Variables
  Email!: any;
  Phone!: any;
  message!: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    document.addEventListener('scroll', () => {
      const scrollTop: any = document.documentElement.scrollTop;
      const arrowbox: any = document.querySelector('.arrowbox');

      if (scrollTop === 0) {
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

  scrollToForm() {
    window.scrollTo(0, 4288);
  }

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
        return
      }

      const responseToJSON = await response.json();

      throw new Error(responseToJSON.message);
    } catch (err: any) {
      let errorMessage = 'Error Occured';
      alert(errorMessage);

      console.log('rato')
    }
  }
}
