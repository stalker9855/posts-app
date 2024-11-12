import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostAPIService } from '../services/post-api/post-api.service';
import { PostForm } from '../models/post-form.model';
import { CurrentUserService } from '../services/currentUser/current-user-service.service';

@Component({
  selector: 'app-post-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-create-form.component.html',
  styleUrl: './post-create-form.component.scss'
})
export class PostCreateFormComponent {
  file: File | null = null;
  allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  postForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    content: new FormControl<string>('', [Validators.required]),
    image: new FormControl<File | null>(null ?? this.file),
    user_id: new FormControl<number | null>(null)
  })

  constructor(private postService: PostAPIService, private currentUserService: CurrentUserService) {
  }

  get currentUser() {
    return this.currentUserService.getCurrentUser()
  }


  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement
    if(input.files && input.files[0]) {
      const file = input.files[0]

      if(!this.allowedMimeTypes.includes(file.type)) {
        alert('Only JPG, JPEG, GIF files');
        this.postForm.patchValue({
          image: null
        })
        return;
      }
    }
    this.file = event.target.files[0]
    this.postForm.patchValue({
      image: this.file
    })
  }

  onSubmit() {
    this.postForm.patchValue({
      user_id: this.currentUser?.id
    })
    if (this.postForm.valid) {
      const formData: FormData = new FormData()
      Object.keys(this.postForm.value).forEach(key => {
        const value = this.postForm.value[key as keyof PostForm]
        formData.append(key, value as string);
      })
      this.postService.createPost(formData).subscribe(
        response => {
          console.log('Post created successfully', response)
        }
      )
    } else {
      console.log('Error')
    }
  }
}
