import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/core/error-matchers/ErrorStateMatcher';
import { Post } from 'src/app/core/models/request/post.model';
import { PostService } from 'src/app/core/services/post.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  userId: number;

  post: Post = { id: 0, comments: [], description: "", imageId: 0, likes: [], totalLikes: 0, totalUnlikes: 0, userId: null };

  registerForm: FormGroup;

  submitted = false;

  uploadedImage: string | ArrayBuffer = '';

  matcher: MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private userService: UserService,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      description: null,
      file: [null, Validators.required]
    });

    this.userService.getByEmail(localStorage['mail']).subscribe(res => {
      this.userId = res['ID'];
    });
  }

  get f(): { [key: string]: AbstractControl; } { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.post.userId = this.userId;
    this.post.description = this.registerForm.get('description').value;

    const formData = new FormData();

    formData.append('post', JSON.stringify(this.post));
    formData.append('files', this.registerForm.get('file').value);


    this.create(formData);
  }

  private create(formData: FormData): void {
    this.postService.post(formData).subscribe(res => {
      if (res) {
        this.goBack();
      }
    }, err => {
      console.log(err);
    });
  }

  private goBack(): void {
    this.router.navigateByUrl(`/posts`);
  }

  chooseFile(event): void {
    if (event.target.files.length <= 0) {
      this.setValueForImagInvalidInput();
      return;
    }
    const file = event.target.files[0];
    const mimeType = file.type;

    if (mimeType.match(/image\/*/) == null) {
      this.setValueForImagInvalidInput();
      return;
    }

    this.registerForm.patchValue({
      file
    });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
  }

  private setValueForImagInvalidInput(): void {
    this.registerForm.patchValue({
      file: null
    });
    this.uploadedImage = '';
  }

}
