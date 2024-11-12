import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { PostCreateFormComponent } from './post-create-form/post-create-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent  },
  { path: 'register', component: RegisterFormComponent },
  { path: 'posts', component: PostComponent, canActivate: [authGuard] },
  { path: 'post-create', component: PostCreateFormComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] }
];
