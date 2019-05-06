import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndgamecountriesComponent } from './endgamecountries.component';

describe('EndgamecountriesComponent', () => {
  let component: EndgamecountriesComponent;
  let fixture: ComponentFixture<EndgamecountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndgamecountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndgamecountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
