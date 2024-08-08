import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/_models/user.model';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-missed-ticket',
  templateUrl: './missed-ticket.component.html',
  styleUrls: ['./missed-ticket.component.scss']
})
export class MissedTicketComponent implements OnInit {
  allAssignees = [];
  currUserSchedules
  start;
  end;
  customAddBoolean: boolean = false;

  customAddForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    color: new FormControl(''),
    details: new FormControl('', Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<MissedTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private eventService: EventService,
    private snackbar: MatSnackBar,
  ) {
    console.log(data);
    this.start = data.date.toISOString();
    this.end = data.date;
   }

  ngOnInit(): void {
  }

  customAdd(){
    this.customAddBoolean = true;
    this.customAddForm.get('start').setValue(this.data.date);
    this.customAddForm.get('end').setValue(this.data.date);
  }

  submitData(data){
    data.title = this.data.user;
    this.allAssignees = [];
    this.eventService.getAssigneeNames().subscribe((res: User[]) =>{
      res.forEach(user=>{
        this.allAssignees.push(user.userName)
      })
      let index = this.allAssignees.indexOf(data.title);
      if(index === 0){
        data.color = "green";
      }
      if(index === 1){
        data.color = "#03c5de";
      }
      if(index === 2){
        data.color = "#f9483b";
      }
      if(index === 3){
        data.color = "#ff9800";
      }
      if(index === 4){
        data.color = "#8f4a4a";
      }
      if(index === 5){
        data.color = "#9fe51f";
      }
      if(index === 6){
        data.color = "#0f589c";
      }
      if(index === 7){
        data.color = "#8614b3";
      }
      if(index === 8){
        data.color = "#08b8dc";
      }
      console.log(data);
      
      this.eventService.getSchedules().subscribe(res=>{
        res.forEach(user=>{
          if(user.title === data.title){
            this.currUserSchedules = user;
          }
        })
        console.log(this.currUserSchedules);

        if(this.currUserSchedules === undefined){
          let entity = { start: data.start, end: data.end, details: data.details };
          let user = { 
            title: data.title,
            colour: data.color,
            schedules: []
          }
          this.currUserSchedules = user;
          this.currUserSchedules.schedules.push(entity);
          console.log(this.currUserSchedules);
          this.eventService.postSchedule(this.currUserSchedules).subscribe(res=>{
            this.eventService.postEvent(data).subscribe(res => {
              this.dialogRef.close('added');
              this.showNotification(
                'snackbar-success',
                'Record Updated Successfully...!!!',
                'bottom',
                'center'
              )
            })
          });
        }

        else{
          let entity = { start: data.start, end: data.end, details: data.details, tid: this.currUserSchedules._id };
          console.log(entity);
          this.eventService.addScheduleInSchedule(entity).subscribe(res=>{
            this.eventService.postEvent(data).subscribe(res => {
              console.log(data);
              
              this.dialogRef.close('added');
              this.showNotification(
                'snackbar-success',
                'Record Updated Successfully...!!!',
                'bottom',
                'center'
              )
            })
          });
        }

      })

    });
  }

  nothing(){
    const title = this.data.user;
    this.allAssignees = [];
    this.eventService.getAssigneeNames().subscribe((res: User[]) =>{
      res.forEach(user=>{
        this.allAssignees.push(user.userName)
      })
      let index = this.allAssignees.indexOf(title);
      let color;
      if(index === 0){
        color = "green";
      }
      if(index === 1){
        color = "#03c5de";
      }
      if(index === 2){
        color = "#f9483b";
      }
      if(index === 3){
        color = "#ff9800";
      }
      if(index === 4){
        color = "#8f4a4a";
      }
      if(index === 5){
        color = "#9fe51f";
      }
      if(index === 6){
        color = "#0f589c";
      }
      if(index === 7){
        color = "#8614b3";
      }
      if(index === 8){
        color = "#08b8dc";
      }
      this.end.setMinutes(this.end.getMinutes() + 1);

      let body = { title: title, color: color, start: this.start, end: this.end.toISOString(), details: "Nothing Happened Today" }
      console.log(body);

      this.eventService.getSchedules().subscribe(res=>{
        res.forEach(user=>{
          if(user.title === title){
            this.currUserSchedules = user;
          }
        })
        console.log(this.currUserSchedules);

        if(this.currUserSchedules === undefined){
          let entity = { start: this.start, end: this.end, details: "Nothing Happened Today" };
          let user = { 
            title: title,
            colour: color,
            schedules: []
          }
          this.currUserSchedules = user;
          this.currUserSchedules.schedules.push(entity);
          console.log(this.currUserSchedules);
          this.eventService.postSchedule(this.currUserSchedules).subscribe(res=>{
            this.eventService.postEvent(body).subscribe(res => {
              this.dialogRef.close('added');
              this.showNotification(
                'snackbar-success',
                'Record Updated Successfully...!!!',
                'bottom',
                'center'
              )
            })
          });
        }

        else{
          let entity = { start: this.start, end: this.end, details: "Nothing Happened Today", tid: this.currUserSchedules._id };
          console.log(entity);
          this.eventService.addScheduleInSchedule(entity).subscribe(res=>{
            this.eventService.postEvent(body).subscribe(res => {
              console.log(body);
              
              this.dialogRef.close('added');
              this.showNotification(
                'snackbar-success',
                'Record Updated Successfully...!!!',
                'bottom',
                'center'
              )
            })
          });
        }

      })
    });
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
