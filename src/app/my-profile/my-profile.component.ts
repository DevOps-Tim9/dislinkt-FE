import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '../core/error-matchers/ErrorStateMatcher';
import { UserRequest } from '../core/models/request/user-request.model';
import { UserUpdateRequest } from '../core/models/request/user-update-request.model';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import { Snackbar } from '../shared/snackbar/snackbar';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  hidePassword = true;
  hideConfirmPassword = true;
  invalidDateFormat = false;
  gender = 0;
  genders = [{label: 'Male', value: 0}, {label: 'Female', value: 1}];
  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();
  currentUser = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
      biography: [''],
      education: [''],
      workExperience: [''],
      skills: [''],
      interests: [''],
      public: [false],
    });
  }

  ngOnInit(): void {
    this.userService.getByEmail(localStorage.getItem('mail')).subscribe((res: any) => {
      this.currentUser = res;
      this.registerForm.controls['username'].setValue(res.Username);
      this.registerForm.controls['firstName'].setValue(res.FirstName);
      this.registerForm.controls['lastName'].setValue(res.LastName);
      this.registerForm.controls['dateOfBirth'].setValue(new Date(res.DateOfBirth));
      this.registerForm.controls['email'].setValue(res.Email);
      this.registerForm.controls['phoneNumber'].setValue(res.PhoneNumber);
      this.registerForm.controls['gender'].setValue(res.Gender);
      this.registerForm.controls['biography'].setValue(res.Biography);
      this.registerForm.controls['education'].setValue(res.Education);
      this.registerForm.controls['workExperience'].setValue(res.WorkExperience);
      this.registerForm.controls['skills'].setValue(res.Skills);
      this.registerForm.controls['interests'].setValue(res.Interests);
      this.registerForm.controls['public'].setValue(res.Public);
    })
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

  onChangePublic(event) {
    this.registerForm.controls['public'].setValue(event.checked);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const newUser: UserUpdateRequest = { ID: this.currentUser.ID, username: '', firstName: '', lastName: '', dateOfBirth: 0, email: '', phoneNumber: '', gender: 0, biography: '', education: '', workExperience: '', skills: '', interests: '', public: false };
    newUser.username = this.registerForm.value.username;
    newUser.firstName = this.registerForm.value.firstName;
    newUser.lastName = this.registerForm.value.lastName;
    newUser.dateOfBirth = this.registerForm.value.dateOfBirth.getTime();
    newUser.email = this.registerForm.value.email;
    newUser.phoneNumber = this.registerForm.value.phoneNumber;
    newUser.gender = this.registerForm.value.gender;
    newUser.biography = this.registerForm.value.biography;
    newUser.education = this.registerForm.value.education;
    newUser.workExperience = this.registerForm.value.workExperience;
    newUser.skills = this.registerForm.value.skills;
    newUser.interests = this.registerForm.value.interests;
    newUser.public = this.registerForm.value.public;

    this.userService.update(newUser).subscribe((res: any) => {
      if (res === -1) {
        this.snackBar.error("Email already exists.");
        return  
      }
      localStorage.setItem('mail', res.Email);
      this.router.navigate(['/home']);
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
