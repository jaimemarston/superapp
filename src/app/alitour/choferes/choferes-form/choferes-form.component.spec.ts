import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesFormComponent } from './Choferes-form.component';

describe('ChoferesFormComponent', () => {
  let component: ChoferesFormComponent;
  let fixture: ComponentFixture<ChoferesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoferesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoferesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
