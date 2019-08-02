import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasListComponent } from './guias-list.component';

describe('GuiasListComponent', () => {
  let component: GuiasListComponent;
  let fixture: ComponentFixture<GuiasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
