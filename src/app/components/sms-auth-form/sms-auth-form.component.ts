import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sms-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './sms-auth-form.component.html',
  styleUrl: './sms-auth-form.component.css'
})
export class SmsAuthFormComponent {
  @Input() user!: User; 
  smsToken: string = '';
  feedbackMessage: string = '';
 
  constructor(private authService: AuthService, private router: Router) { }

  handleSmsAuth() {
    this.authService.generateSmsToken(this.user).subscribe({
      next: () => {
        this.feedbackMessage = 'SMS enviado';
      },
      error: (error) => {
        this.feedbackMessage = 'Erro ao enviar SMS: ' + error.message;
        console.error('Erro ao gerar QR code:', error);
      }
    });
  }

  validateToken() {
    if (!this.smsToken) {
      this.feedbackMessage = 'Por favor, insira o Token.';
      return;
    }

    this.authService.validateSMSToken(this.user.identificationNumber, this.smsToken).subscribe({
      next: (response) => {
        this.router.navigate(['/welcome']);
        console.log('Resposta da validação:', response);
      },
      error: (error) => {
        this.feedbackMessage = 'Erro ao validar token: ' + error.message;
        console.error('Erro ao validar token:', error);
      }
    });
  }
}
