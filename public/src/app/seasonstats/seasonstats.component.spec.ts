import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonstatsComponent } from './seasonstats.component';

describe('SeasonstatsComponent', () => {
  let component: SeasonstatsComponent;
  let fixture: ComponentFixture<SeasonstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
