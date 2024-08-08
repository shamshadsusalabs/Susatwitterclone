import { UsersComponent } from './components/users/users.component';
import { StandUpsComponent } from './components/stand-ups/stand-ups.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanComponent } from './components/kanban/kanban.component';
import { AuthGuard } from './_authguard/auth.guard';
import { KanbanHistoryComponent } from './components/kanban-history/kanban-history.component';
import { KanbanTableComponent } from './components/kanban-table/kanban-table.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'dashboard',
    component: CalendarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'kanban',
    component: KanbanComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'kanban-history',
    component: KanbanHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'kanban-table',
    component: KanbanTableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stand-ups',
    component: StandUpsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'googleSigIn', loadChildren: () => import('./GoogleSignIn/google-sing-in.module').then(m => m.GoogleSingInModule),

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
