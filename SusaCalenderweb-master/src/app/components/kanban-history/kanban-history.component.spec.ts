import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanHistoryComponent } from './kanban-history.component';

describe('KanbanHistoryComponent', () => {
  let component: KanbanHistoryComponent;
  let fixture: ComponentFixture<KanbanHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
