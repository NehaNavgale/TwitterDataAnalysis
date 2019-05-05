import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearwisechartComponent } from './yearwisechart.component';

describe('YearwisechartComponent', () => {
  let component: YearwisechartComponent;
  let fixture: ComponentFixture<YearwisechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearwisechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearwisechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
