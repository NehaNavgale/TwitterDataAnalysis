import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetsForMoviesComponent } from './tweets-for-movies.component';

describe('TweetsForMoviesComponent', () => {
  let component: TweetsForMoviesComponent;
  let fixture: ComponentFixture<TweetsForMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetsForMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetsForMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
