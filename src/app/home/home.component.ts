import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import SwiperCore, { EffectFade, Keyboard, Pagination, Autoplay } from 'swiper';
import { ImageComponent } from '../image/image.component';

SwiperCore.use([EffectFade, Pagination, Keyboard, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  // Fontweasome
  arrows: any = faAnglesDown;
  userForm!: FormGroup;

  // Messages
  formErrorMessage: string = '';
  formSuccessMessage: string = '';
  spinnerMode!: boolean;

  API_URL = 'http://95.216.40.62:5012';

  Email!: any;
  Phone!: any;
  message!: any;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    document.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;

      const line1 = document.querySelector('.line1');
      const square1 = document.querySelector('.square1');

      const line2 = document.querySelector('.line2');
      const square2 = document.querySelector('.square2');

      const line3 = document.querySelector('.line3');
      const square3 = document.querySelector('.square3');

      const line4 = document.querySelector('.line4');
      const square4 = document.querySelector('.square4');

      if (scrollTop > 700) {
        line1?.classList.add('line1-active');
        square1?.classList.add('square1-active');
      }

      if (scrollTop > 1500) {
        line2?.classList.add('line2-active');
        square2?.classList.add('square2-active');
      }

      if (scrollTop > 2400) {
        line3?.classList.add('line3-active');
        square3?.classList.add('square3-active');
      }

      if (scrollTop > 3300) {
        line4?.classList.add('line4-active');
        square4?.classList.add('square4-active');
      }
    });

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
    document.documentElement.scrollTop = 960;
  }

  openImage() {
    this.dialog.open(ImageComponent, {
      panelClass: 'modal-image'
    });
  }


  // Post Request
  async handleSubmit(e: any) {
    e.preventDefault();
    this.spinnerMode = true;

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

        this.formErrorMessage = '';
        this.formSuccessMessage = 'Message Sent Successfully';
        this.spinnerMode = false;

        setTimeout(() => {
          this.formSuccessMessage = '';
        }, 3000);

        return
      }

      const responseToJSON = await response.json();

      throw new Error(responseToJSON.message);
    } catch (err: any) {
      let errorMessage = 'Error Occured';

      this.formSuccessMessage = '';
      this.formErrorMessage = errorMessage;
      this.spinnerMode = false;

      setTimeout(() => {
        this.formErrorMessage = '';
      }, 3000);
    }
  }
}
