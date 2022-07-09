import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../core/error-matchers/ErrorStateMatcher';
import { UserRequest } from '../core/models/request/user-request.model';
import { AuthService } from '../core/services/auth.service';
import { DateValidator } from '../core/validator/date-validator';
import { Snackbar } from '../shared/snackbar/snackbar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  hidePassword = true;
  hideConfirmPassword = true;
  invalidDateFormat = false;
  gender = 0;
  genders = [{label: 'Male', value: 0}, {label: 'Female', value: 1}];
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private snackBar: Snackbar,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: [0, Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value === null) {
      this.invalidDateFormat = true;
    } else {
      this.invalidDateFormat = false;
    }
  }

  filterDate(d: Date | null): boolean {
    return d < new Date();
  };

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const newUser: UserRequest = { username: '', firstName: '', lastName: '', dateOfBirth: 0, email: '', phoneNumber: '', gender: 0, password: '' };
    newUser.username = this.registerForm.value.username;
    newUser.firstName = this.registerForm.value.firstName;
    newUser.lastName = this.registerForm.value.lastName;
    newUser.dateOfBirth = this.registerForm.value.dateOfBirth.getTime();
    newUser.email = this.registerForm.value.email;
    newUser.phoneNumber = this.registerForm.value.phoneNumber;
    newUser.gender = this.registerForm.value.gender;
    newUser.password = this.registerForm.value.password;

    this.authenticationService.register(newUser).subscribe((res: any) => {
      if (res === -1) {
        this.snackBar.error("Email already exists.");
        return  
      }
      console.log(res);
      this.router.navigate(['/']);
    },
    error => {
      console.log(error.error);
      if (error.error.Constraint == "users_username_key")
        this.snackBar.error("Username already exists.");
      if (error.error.Constraint == "users_email_key")
        this.snackBar.error("Email already exists.");
    });
  }

  get f(): { [key: string]: AbstractControl; } { return this.registerForm.controls; }

}
