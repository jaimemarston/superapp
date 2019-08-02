import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresFormComponent } from './Proveedores-form.component';

describe('ProveedoresFormComponent', () => {
  let component: ProveedoresFormComponent;
  let fixture: ComponentFixture<ProveedoresFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
