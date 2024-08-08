import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StandUps } from '../_models/standups.model';

@Injectable({
  providedIn: 'root'
})
export class StandupsService {

  constructor(private http: HttpClient) { }

  getStandups(){
    return this.http.get<StandUps[]>(" https://susacalender.el.r.appspot.com/api/standups/getall");
  }

  getid(data : any){
    return this.http.post("https://susalogyapi.herokuapp.com/api/products/getuser/SusaTask/"+data, {});
  }

  getdetails(data : any){
    return this.http.get(" https://susacalender.el.r.appspot.com/api/user/details/"+data);
  }

  addTaskinStandups(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/standups/addtasks", data);
  }

  updateTaskinStandups(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/standups/updateisCompleted", data);
  }

  updatePopupdate(data, id){
    console.log(data, id);
    return this.http.post(` https://susacalender.el.r.appspot.com/api/standups/update?id=${id}`, data);
  }

  addStandups(data){
    return this.http.post(" https://susacalender.el.r.appspot.com/api/standups/add", data);
  }
}
