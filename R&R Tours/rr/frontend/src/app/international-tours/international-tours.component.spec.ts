import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalToursComponent } from './international-tours.component';

describe('InternationalToursComponent', () => {
  let component: InternationalToursComponent;
  let fixture: ComponentFixture<InternationalToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
