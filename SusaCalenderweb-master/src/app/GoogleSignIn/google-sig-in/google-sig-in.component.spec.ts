import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSigInComponent } from './google-sig-in.component';

describe('GoogleSigInComponent', () => {
  let component: GoogleSigInComponent;
  let fixture: ComponentFixture<GoogleSigInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleSigInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSigInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
