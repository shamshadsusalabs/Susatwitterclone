import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { kanbanEvents } from 'src/app/_models/kanbanEvents.model';
import { TasksService } from 'src/app/_services/tasks.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  action;
  photo;
  createdBy = ["Company", "Third-Party"];
  priorities = ["Minimal", "Normal", "Moderate", "High", "Critical"] ;
  dialogTitle;
  tasksForm = this.tasksService.tasksForm;

  constructor(
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tasksService: TasksService,
    private dialog: MatDialog
  ) {
    this.action = data.action;
    if(this.action === 'view'){
      this.dialogTitle = data.task.title;
      console.log(data);
      
    }
    if(this.action === 'new'){
      this.dialogTitle = "New Record"
      this.tasksService.tasksForm.reset();
    }
    if(this.action === 'edit'){
      this.dialogTitle = data.task.title;
      this.tasksService.tasksForm.get('title').setValue(data.task.title)
      this.tasksService.tasksForm.get('index').setValue(data.task.index)
      this.tasksService.tasksForm.get('statusId').setValue(data.task.statusId)
      this.tasksService.tasksForm.get('description').setValue(data.task.description)
      this.tasksService.tasksForm.get('imageURL').setValue(data.task.imageURL)
      this.photo = data.task.imageURL;
      this.tasksService.tasksForm.get('name').setValue(data.task.name);
      this.tasksService.tasksForm.get('priority').setValue(data.task.priority);
      this.tasksService.tasksForm.get('creationDate').setValue(data.task.creationDate);
      this.tasksService.tasksForm.get('closingDate').setValue(data.task.closingDate);
      this.tasksService.tasksForm.get('modifiedDate').setValue(data.task.modifiedDate);
      this.tasksService.tasksForm.get('progressDate').setValue(data.task.progressDate);
    }
    console.log(tasksService.tasksForm);
   }

  ngOnInit(): void {
  }

  onSubmit(data){
    if(this.action === 'newKanban'){
      console.log(data);
      let min;
      let max = 0;
      this.tasksService.getKanbanData().subscribe(item => {
        console.log(item);
        let user = JSON.parse(localStorage.getItem('currUser'));
        item.forEach(res=>{
          if(res.name === user.userName){
            console.log(res);
            res.kanbanFields.forEach(element => {
              min = element.statusId;
              if(min > max){
                max = min;
              }
            })
            data.statusId = max + 1;
            const currUser = JSON.parse(localStorage.getItem('currUser'));
            this.tasksService.getKanbanData().subscribe(res=>{
              res.forEach(ele=>{
                if(ele.name === currUser.userName){
                  let body = { tid: ele._id, statusId: data.statusId, statusName: data.statusName };
                  console.log(body);
                  this.tasksService.addKanbanFields(body).subscribe(res=> {
                    this.dialogRef.close('added')
                  })
                }
              })
            })
          }
        })
      })
    }

    if(this.action === 'edit'){
      console.log(data);
      this.tasksService.updateKanbanEvents(data,this.data.task._id ).subscribe(data => {
        this.dialogRef.close("edit");
      })
    }

    if(this.action === 'new'){
      console.log(data);
      const currUser = JSON.parse(localStorage.getItem('currUser'));

      data.statusId = 1;
      let lastItem = [];
      this.tasksService.getKanbanEvents().subscribe(array => {
        array.forEach(element => {
          if(element.name === currUser.userName){
            if(element.statusId === 1 ){
              lastItem.push(element.index);
            }
          }
        });
        let maxItem = 0;
        let minItem;
        for(let i = 0; i < lastItem.length; i++){
          minItem = lastItem[i];
          if(minItem > maxItem){
            maxItem = minItem
          }
        }
        console.log(maxItem);
        data.index = maxItem + 1;
        data.name = currUser.userName;
        data.creationDate = new Date().toISOString();
        console.log(data);

        this.tasksService.addKanbanEvents(data).subscribe(
          fields => {
            console.log(fields)
            this.tasksService.tasksForm.reset();
            this.dialogRef.close("added");
        })
      })
    }
  }

  closeTicket(data){
    let date = new Date().toISOString();
    console.log(data);
    let body = { closingDate: date, index: null };
    let closedStatusId = data.statusId;
    let closedIndex = data.index;
    console.log(closedStatusId, closedIndex);
    let user = JSON.parse(localStorage.getItem('currUser'));
    this.tasksService.getKanbanEvents().subscribe(datas => {   
      let events: kanbanEvents[] = datas.filter(x => x.name === user.userName);
      events = events.filter(x => x.statusId === closedStatusId);
      console.log(events);
      if(events.length !== 0){
        events.forEach(event=>{
          if(event.index > closedIndex){
            let body = { index: event.index - 1 };
            this.tasksService.updateKanbanEvents(body, event._id).subscribe(res=>{
              this.dialogRef.close('closed');
            })
          }
        })
      }
      else{
        this.dialogRef.close('closed');
      }
      this.tasksService.updateKanbanEvents(body, data._id).subscribe(res=>{})
    })
  }

  deleteRecord(){
    console.log(this.data.task);
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        row: this.data.task,
        action: 'deleteRecord'
      },
      disableClose: false,
      autoFocus: true,
      width: '30%',
      height: '250px', 
    });
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      if(res === 'task'){
        this.dialogRef.close("task");
      }
    })
  }

  uploadImage(event){
    console.log(event.target.files[0]);
    this.tasksService.uploadImages(event.target.files[0]).subscribe(res=>{
      let photo: any = res;
      this.photo = photo.longUrl;
      console.log(this.photo);
      this.tasksService.tasksForm.get('imageURL').setValue(photo.longUrl);
    })
  }

  openImage(url){
    window.open(url);
  }


}
