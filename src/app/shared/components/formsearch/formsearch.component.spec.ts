import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsearchComponent } from './formsearch.component';

describe('FormsearchComponent', () => {
  let component: FormsearchComponent;
  let fixture: ComponentFixture<FormsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
