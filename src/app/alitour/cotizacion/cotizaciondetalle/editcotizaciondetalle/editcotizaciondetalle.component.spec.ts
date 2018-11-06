import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcotizaciondetalleComponent } from './editcotizaciondetalle.component';

describe('EditcotizaciondetalleComponent', () => {
  let component: EditcotizaciondetalleComponent;
  let fixture: ComponentFixture<EditcotizaciondetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcotizaciondetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcotizaciondetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
