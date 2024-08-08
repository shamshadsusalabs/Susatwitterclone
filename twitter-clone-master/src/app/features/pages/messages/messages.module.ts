import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {  MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DisplayDatePipe } from '../../services/display-date.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    MessagesComponent,
    DisplayDatePipe

  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,FormsModule,MatSnackBarModule
  ],
  providers: [DatePipe],
})
export class MessagesModule { }
