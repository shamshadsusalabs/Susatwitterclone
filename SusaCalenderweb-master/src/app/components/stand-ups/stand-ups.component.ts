import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StandupsTimeComponent } from './standups-time/standups-time.component';
import { StandupsService } from './../../_services/standups.service';
import { StandUps } from './../../_models/standups.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stand-ups',
  templateUrl: './stand-ups.component.html',
  styleUrls: ['./stand-ups.component.scss']
})
export class StandUpsComponent implements OnInit {
  users: StandUps[] = [];
  currUser;
  showRetroToggle: boolean = false;
  dataSource = [];
  currEmpName;
  displayedColumns = ['srno', 'title', 'description', 'date', 'completed'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private standupService: StandupsService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.currUser = JSON.parse(localStorage.getItem('currUser'));
    if(this.currUser.userName === 'Manager'){
      this.getStandUps();
    }
    else{
      alert(`${this.currUser.userName}, you don't have permission to access this!`)
      this.router.navigateByUrl('/dashboard');
    }
  }

  openDialog(data){
    const dialogRef = this.dialog.open(StandupsTimeComponent, {
      width: '30%',
      height: '200px',
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'Updated'){
        this.getStandUps();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  getStandUps(){
    this.standupService.getStandups().subscribe(res=>{
      this.users = res;
    })
  }

  showRetro(user){
    console.log(user);
    this.showRetroToggle = true;
    this.currEmpName = user.name;
    this.dataSource = user.tasks;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackbar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign, 
      panelClass: colorName,
    });
  }
}
