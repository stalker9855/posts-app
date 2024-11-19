import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../services/currentUser/current-user-service.service';
import { Post } from '../models/post.model';
import { PostItemComponent } from '../post-item/post-item.component';
import { FormsModule } from '@angular/forms';
import { UserEditForm } from '../models/user-edit.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PostItemComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isEditingProfile: Boolean = false;
  editUser!: UserEditForm;
  posts: Post[] = [];


  constructor(private currentUserService: CurrentUserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUserService.getUserPosts().subscribe(
      (data) => {
        this.posts = data
        console.log(this.posts)
      }
    )
  }

  get currentUser() {
    return this.currentUserService.getCurrentUser() ?? {id: null, name: '', email: ''}
  }

  saveUserChanges() {
    console.log(this.editUser)
    const formData: FormData = new FormData()
    Object.keys(this.editUser).forEach(key => {
      const value = this.editUser[key as keyof UserEditForm]
      formData.append(key, value as string);
    })
    this.currentUserService.editUser(formData).subscribe(response => {
      this.toastr.success("Success", "User edited")
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    })

  }

  startEditUser() {
    this.isEditingProfile = true;
    this.editUser = {
      id: this.currentUser.id,
      name: this.currentUser.name,
      email: this.currentUser.email
    }
  }

  cancelEditUser(): void {
    this.isEditingProfile = false
  }

}
