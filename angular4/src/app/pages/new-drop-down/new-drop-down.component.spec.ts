import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDropDownComponent } from './new-drop-down.component';

describe('NewDropDownComponent', () => {
  let component: NewDropDownComponent;
  let fixture: ComponentFixture<NewDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
