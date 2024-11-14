import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];