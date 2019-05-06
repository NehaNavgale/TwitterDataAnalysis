import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaendgameComponent } from './baendgame.component';

describe('BaendgameComponent', () => {
  let component: BaendgameComponent;
  let fixture: ComponentFixture<BaendgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaendgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaendgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
