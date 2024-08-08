import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleSignInService } from 'src/app/_services/google-sign-in.service';
import { StandupsService } from 'src/app/_services/standups.service';
import { TasksService } from 'src/app/_services/tasks.service';
import { User } from 'src/app/_models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-google-sig-in',
  templateUrl: './google-sig-in.component.html',
  styleUrls: ['./google-sig-in.component.scss']
})
export class GoogleSigInComponent implements OnInit {

  constructor(
    public signInService: GoogleSignInService,
    private router: Router,
    private snackbar: MatSnackBar,
    private taskService: TasksService,
    private standupService: StandupsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('currUser')){

      this.router.navigateByUrl('/dashboard');

    }
  }



  onSignIn(): void {
    // Retrieve the email from URL query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      const email = params['email'];
      if (email) {
        const body = { email };
        this.signInService.logIn(body).subscribe({
          next: (res: User) => {
            if (res.isVerified) {
              this.processSuccessfulSignIn(res);
            } else {
              this.signInService.signInForm.reset();
              this.showNotification('snackbar-danger', 'Account is Not Yet Verified!', 'bottom', 'center');
            }
          },
          error: err => {
            console.error('Error during login:', err);
            this.showNotification('snackbar-danger', 'Provided Credential is Invalid!', 'bottom', 'center');
          }
        });
      } else {
        console.error('No email found in URL parameters');
        this.showNotification('snackbar-danger', 'No email found. Please log in again.', 'bottom', 'center');
      }
    });
  }


  private processSuccessfulSignIn(res: User): void {
    this.signInService.signInForm.reset();
    localStorage.setItem('currUser', JSON.stringify(res));
    this.signInService.loggedIn.next(true);
    this.router.navigateByUrl('/dashboard');
    this.showNotification('snackbar-success', 'Sign In Successfully...!!!', 'bottom', 'center');

    const standup = { name: res.userName, popupDate: "", tasks: [] };
    this.standupService.addStandups(standup).subscribe();
    const kanbanData = { name: res.userName, sharedKanban: [], sharedKanbanData: [], kanbanFields: [] };
    this.taskService.addKanbanData(kanbanData).subscribe({
      error: err => console.log(err)
    });
    this.signInService.signupFirebase(res.email, res.password).subscribe({
      next: user => console.log(user),
      error: err => console.log(err)
    });
  }

  showNotification(colorName: string, text: string, placementFrom: MatSnackBarVerticalPosition, placementAlign: MatSnackBarHorizontalPosition): void {
    this.snackbar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}



