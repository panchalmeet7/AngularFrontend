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
  {
    path: 'list',
    component: RegistrationListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: CreateRegistrationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'detail/:id',
    component: MemberDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'update/:id',
    component: CreateRegistrationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
