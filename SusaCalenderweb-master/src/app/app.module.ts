import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ViewScheduleComponent } from './components/view-schedule/view-schedule.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { FormComponent } from './components/kanban/form/form.component';
import { DeleteComponent } from './components/kanban/delete/delete.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewKanbanComponent } from './components/kanban/view-kanban/view-kanban.component';
import { BackgroundComponent } from './components/kanban/background/background.component';
import { KanbanHistoryComponent } from './components/kanban-history/kanban-history.component';
import { StandUpsComponent } from './components/stand-ups/stand-ups.component';
import { StandupsTimeComponent } from './components/stand-ups/standups-time/standups-time.component';
import { SprintComponent } from './components/calendar/sprint/sprint.component';
import { UsersComponent } from './components/users/users.component';
import { KanbanTableComponent } from './components/kanban-table/kanban-table.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { MissedTicketComponent } from './components/calendar/missed-ticket/missed-ticket.component';




FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HeaderComponent,
    SignInComponent,
    DialogComponent,
    ViewScheduleComponent,
    KanbanComponent,
    FormComponent,
    DeleteComponent,
    ViewKanbanComponent,
    BackgroundComponent,
    KanbanHistoryComponent,
    StandUpsComponent,
    StandupsTimeComponent,
    SprintComponent,
    UsersComponent,
    KanbanTableComponent,
    ForgotpasswordComponent,
    MissedTicketComponent,


  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    DragDropModule,
    AppRoutingModule,
    MatBottomSheetModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTabsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    OwlDateTimeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatRadioModule,
    OwlNativeDateTimeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '28986876858-bv1dd1nifuehavfl366d44f226bil4c9.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
