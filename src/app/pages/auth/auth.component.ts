import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleAuthFormComponent } from '../../components/google-auth-form/google-auth-form.component';
import { SmsAuthFormComponent } from '../../components/sms-auth-form/sms-auth-form.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, GoogleAuthFormComponent, SmsAuthFormComponent, UserFormComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent { 
  user!: User;
  isSmsAuth = false;
  isGoogleAuth = false;

  chooseAuth(user: User) {
    this.user = user;
    console.log(user);
    
    if (user.authMethod == 'googleAuth') {
      this.isGoogleAuth = true;
      this.isSmsAuth = false;

    }
    else {
      this.isSmsAuth = true;
      this.isGoogleAuth = false;
    }
  }
}
