import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  generateGoogleAuthQRCode(user: User): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/GoogleAuth/generateQRCode`, user, { responseType: 'text' as 'json' });
  }
  validateGoogleAuthPIN(identificationNumber: string, token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GoogleAuth/validatePIN/${identificationNumber}/${token}`);
  }

  generateSmsToken(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/SmsAuth/generateTokenSMS`, user);
  }

  validateSMSToken(identificationNumber: string, token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SmsAuth/validateSMSToken/${identificationNumber}/${token}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/User`, user);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/User/${id}`);
  }
}
