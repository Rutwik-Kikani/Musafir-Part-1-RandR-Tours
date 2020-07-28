import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndianToursComponent } from './indian-tours.component';

describe('IndianToursComponent', () => {
  let component: IndianToursComponent;
  let fixture: ComponentFixture<IndianToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndianToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndianToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
