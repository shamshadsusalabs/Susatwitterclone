import { kanbanEvents } from './../_models/kanbanEvents.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { kanbanUrl, tasksUrl } from '../_config/api';
import { Kanban } from '../_models/kanban.model';
import { kanbanData } from '../_models/kanbanData.model';
import { Tasks } from '../_models/tasks.model';
import { take } from 'rxjs/operators';
import { background } from '../_models/background.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  kanbanForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    statusId: new FormControl(null),
    statusName: new FormControl('', Validators.required)
  })

  backgroundAddFrom: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  tasksForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    name: new FormControl(''),
    imageURL: new FormControl(''),
    statusId: new FormControl(null),
    index: new FormControl(null),
    creationDate: new FormControl(''),
    closingDate: new FormControl(''),
    priority: new FormControl('', Validators.required),
    modifiedDate: new FormControl(''),
    progressDate: new FormControl('')
  })

  getTasks(): Observable<Tasks[]>{
    return this.http.get<Tasks[]>(tasksUrl);
  }

  updateTasks(data){
    return this.http.put(tasksUrl+'/'+data.id, data);
  }

  addTasks(data){
    return this.http.post(tasksUrl, data);
  }

  removeTask(data){
    return this.http.delete<Tasks[]>(tasksUrl+'/'+data.id);
  }

  getKanban(){
    return this.http.get<Kanban[]>(" https://susacalender.el.r.appspot.com/api/kanban/getall");
  }

  getKanbanData(){
    return this.http.get<kanbanData[]>(" https://susacalender.el.r.appspot.com/api/kanbandata/getall");
  }

  addKanbanData(data){
    return this.http.post<kanbanData>(" https://susacalender.el.r.appspot.com/api/kanbandata/add", data);
  }

  getKanbanEvents(){
    return this.http.get<kanbanEvents[]>(" https://susacalender.el.r.appspot.com/api/kanban/getall");
  }

  addKanbanEvents(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/kanban/add", data);
  }

  updateKanbanEvents(data, id){
    return this.http.post<kanbanEvents>(` https://susacalender.el.r.appspot.com/api/kanban/update?id=${id}`, data);
  }

  deleteKanbanEvents(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/kanban/remove", data);
  }

  addKanbanFields(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/kanbandata/addkanbanFields", data);
  }

  deleteKanbanFields(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/kanbandata/deletekanbanFields", data);
  }

  updateKanbanFieldStatusId(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/kanbandata/updatestatusIdkanbanFields", data);
  }

  addSharedKanban(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/kanbandata/addsharedKanban", data);
  }

  deleteSharedKanban(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/kanbandata/deletesharedKanban", data);
  }

  addKanban(data){
    return this.http.post(kanbanUrl, data);
  }

  removeKanban(data){
    return this.http.delete<Kanban[]>(kanbanUrl+'/'+data.id);
  }

  updateKanban(data){
    return this.http.put(kanbanUrl+'/'+data.id, data);
  }

  getBackgroundPictures(){
    return this.http.get<background[]>(" https://susacalender.el.r.appspot.com/api/themes/getall");
  }

  deleteBackground(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/themes/remove", data);
  }

  addBackground(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/themes/add", data);
  }

  uploadImages(data): Observable<{}>{
    const formData = new FormData();
    formData.append("file", data);
    return this.http.post(" https://susacalender.el.r.appspot.com/api/upload/addfiles", formData);
  }
}
