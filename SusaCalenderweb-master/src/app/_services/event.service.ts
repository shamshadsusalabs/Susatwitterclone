import { BehaviorSubject } from 'rxjs';
import { EventDetails } from '../_models/eventdetails.model';
import { assigneeUrl, eventsUrl, scheduleUrl, sharedscheduleUrl } from './../_config/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Schedule } from '../_models/schedule.model';
import { SharedSchedule } from '../_models/sharedSchedule.model';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  share: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  sharedScheduleLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  showSchedule: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addEventForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    start: new FormControl(null),
    end: new FormControl(null),
    color: new FormControl(''),
    details: new FormControl('', Validators.required)
  })

  sharePersonName: FormGroup = new FormGroup({
    assigneeName: new FormControl('', Validators.required) 
  })

  shareKanbanPerson: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    userId: new FormControl(''),
    statusId: new FormControl(''),
    statusName: new FormControl(''),
    tid: new FormControl('')
  })

  shareScheduleForm: FormGroup = new FormGroup({
    sendTo: new FormControl(''),
    scheduleOf: new FormControl(''),
    sharedDate: new FormControl(''),
    schedules: new FormControl([])
  })

  getAssigneeNames(){
    return this.http.get<[]>("https://susacalender.el.r.appspot.com/api/user/getall");
  }

  getSchedules(){
    return this.http.get<Schedule[]>("https://susacalender.el.r.appspot.com/api/schedule/getall");
  }

  addScheduleInSchedule(data){
    return this.http.post("https://susacalender.el.r.appspot.com/api/schedule/addschedules", data);
  }

  postSchedule(data){
    return this.http.post<Schedule[]>("https://susacalender.el.r.appspot.com/api/schedule/add", data);
  }

  deleteScheduleInSchedule(data){
    return this.http.post("https://susacalender.el.r.appspot.com/api/schedule/deleteschedules", data);
  }

  postEvent(data){
    console.log(data);
    return this.http.post<EventDetails[]>("https://susacalender.el.r.appspot.com/api/event/addevents", data);
  }

  deleteEvent(data){
    return this.http.post("https://susacalender.el.r.appspot.com/api/event/removeevent", data);
  }

  getEvents(){
    return this.http.get<EventDetails[]>("https://susacalender.el.r.appspot.com/api/event/getallevents");
  }

  postSharedSchedule(data){
    return this.http.post<SharedSchedule[]>("https://susacalender.el.r.appspot.com/api/shared/add", data);
  }

  getSharedSchedules(){
    return this.http.get<SharedSchedule[]>("https://susacalender.el.r.appspot.com/api/shared/getall");
  }

  deleteSharedSchedule(data){
    return this.http.post("https://susacalender.el.r.appspot.com/api/shared/remove", data);
  }
}
