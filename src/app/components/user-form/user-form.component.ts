import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, FontAwesomeModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  isIndividual = true;
  identificationNumber: string = '';

  @Output() userInfo = new EventEmitter<User>();

  isSmsAuth = false;
  isGoogleAuth = false;
  showUserForm = false;

  feedbackMessage: string | null = null;

  faUser = faUser;
  faUsers = faUsers;

  constructor(private fb: FormBuilder, private authService: AuthService) { }
  ngOnInit() {
    this.form = this.fb.group({
      type: ['pf', Validators.required],
      name: [''],
      telephone: [''],
      email: ['', [Validators.email]],
      birthDate: [''],
      authMethod: ['googleAuth']
    });
  }

  onTypeChange(type: string) {
    this.isIndividual = type === 'pf';
    this.form.get('type')?.setValue(type);
    this.form.reset();
    this.feedbackMessage = null;
    this.showUserForm = false;
    this.identificationNumber = '';
    this.toggleValidation();
  }

  toggleValidation() {
    if (this.isIndividual) {
      this.form.get('birthDate')?.setValidators([Validators.required]);
    } else {
      this.form.get('birthDate')?.clearValidators();
    }

    this.form.get('birthDate')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid) {
    console.log(this.form)

      const formValue = this.form.value;
      const userValue = new User (
        formValue.type,
        formValue.name,
        formValue.telephone,
        formValue.email,
        formValue.identificationNumber,
        formValue.birthDate,
        formValue.authMethod
      );

    console.log(userValue);

      
      this.userInfo.emit(userValue);
    } else {
      console.log(this.form.value)
      this.feedbackMessage = 'Formulário inválido';
    }
  }
  isIdentificationValid(): boolean {
    const type = this.form.get('type')?.value;

    if (this.identificationNumber == null) {
      return false;
    }
    if (type === 'pf' && this.identificationNumber.length != 11) {
      return false;
    }
    if (type === 'pj' && this.identificationNumber.length != 14) {
      return false;
    }
    return true;
  }
  fillUserInformation() {
    console.log(this.identificationNumber)

    this.authService.getUserById(this.identificationNumber).subscribe({
      next: (user) => {
        if (user != null) {
          this.form = this.fb.group({
            type: [user.type],
            name: [user.name],
            telephone: [user.telephone],
            email: [user.email],
            identificationNumber: [user.identificationNumber],
            birthDate: [user.birthDate],
            authMethod: ['googleAuth']
          });

          this.showUserForm = true;
        }
      },
      error: (err) => {
        if (err.error.status == 404) {
          this.feedbackMessage = 'O usuário não foi encontrado, tente novamente';
        }
        else 
        {
          this.feedbackMessage = 'Erro ao tentar verificar usuário: ' + err.message;
        }
        console.error('Erro ao verificar usuário:', err);
      }
    });
  }
}
