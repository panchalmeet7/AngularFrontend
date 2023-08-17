import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ResetComponent } from './components/user/reset/reset.component';
import { RegistrationListComponent } from './components/admin/registration-list/registration-list.component';
import { CreateRegistrationComponent } from './components/admin/create-registration/create-registration.component';
import { MemberDetailComponent } from './components/admin/member-detail/member-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: RegistrationListComponent },
  { path: 'register', component: CreateRegistrationComponent },
  { path: 'detail/:id', component: MemberDetailComponent },
  { path: 'update/:id', component: CreateRegistrationComponent },
  // { path: '/', redirectTo: 'register', pathMatch: 'full' },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [authGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
