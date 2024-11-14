import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './google-auth-form.component.html',
  styleUrl: './google-auth-form.component.css'
})
export class GoogleAuthFormComponent implements OnChanges {
  @Input() user!: User; 
  googleToken: string = '';
  feedbackMessage: string = '';
  googleAuthQrCode: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      console.log('Usuário recebido:', this.user);
      this.generateQRCode();
    }
  }

  private generateQRCode() {
    this.authService.generateGoogleAuthQRCode(this.user).subscribe({
      next: (qrCodeBase64: string) => {
        this.googleAuthQrCode = qrCodeBase64;
      },
      error: (error) => {
        this.feedbackMessage = 'Erro ao gerar QR code: ' + error.message;
        console.error('Erro ao gerar QR code:', error);
      }
    });
  }

  validateToken() {
    if (!this.googleToken) {
      this.feedbackMessage = 'Por favor, insira o PIN.';
      return;
    }

    this.authService.validateGoogleAuthPIN(this.user.identificationNumber, this.googleToken).subscribe({
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
