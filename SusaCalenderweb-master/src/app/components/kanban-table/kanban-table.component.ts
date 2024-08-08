import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { kanbanEvents } from 'src/app/_models/kanbanEvents.model';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-kanban-table',
  templateUrl: './kanban-table.component.html',
  styleUrls: ['./kanban-table.component.scss']
})
export class KanbanTableComponent implements OnInit {
  currUser;
  kanbanEvents = [];
  dataSource: MatTableDataSource<kanbanEvents>;
  displayedColumns = ["srno", "ticektno", "title", "description", "name", "creationDate", "closingDate", "priority"]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchKey: string;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getKanbanEvents();
  }

  getCurrentUser(){
    this.currUser = JSON.parse(localStorage.getItem('currUser'));
  }

  getKanbanEvents(){
    this.kanbanEvents = [];
    this.tasksService.getKanbanEvents().subscribe(res=>{
      this.kanbanEvents = res;
      console.log(this.kanbanEvents);
      this.dataSource = new MatTableDataSource(this.kanbanEvents);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
