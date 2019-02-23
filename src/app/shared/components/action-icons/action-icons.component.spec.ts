import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionIconsComponent } from './action-icons.component';

describe('ActionIconsComponent', () => {
  let component: ActionIconsComponent;
  let fixture: ComponentFixture<ActionIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
