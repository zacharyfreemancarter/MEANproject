import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonchartComponent } from './seasonchart.component';

describe('SeasonchartComponent', () => {
  let component: SeasonchartComponent;
  let fixture: ComponentFixture<SeasonchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
