import { Component, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
} from '@angular/material';

export interface Food {
  value: string;
  viewValue: string;
}

export interface Mes {
  value: string;
  viewValue: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})



export class MainNavComponent {
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  @Input() tituloprincipal: string;

  foods: Food[] = [
    { value: 'steak-0', viewValue: '2018' },
    { value: 'pizza-1', viewValue: '2019' },
    { value: 'tacos-2', viewValue: '2020' }
  ];

  meses: Mes[] = [
    { value: '1', viewValue: 'Enero' },
    { value: '2', viewValue: 'Febrero' },
    { value: '3', viewValue: 'Marzo' }
  ];

  routes: Object[] = [{
    icon: 'directions_walk',
    route: '/users',
    title: 'Clientes',
    description: 'Item description',
  }, {
    icon: 'local_taxi',
    route: '/unidades',
    title: 'Transporte',
    description: 'Item description',

  }, {
    icon: 'print',
    route: '/articulos',
    title: 'Servicios',
    description: 'Item description',

  },
/*   {
    icon: 'local_shipping',
    route: '/user',
    title: 'Proveedores',
    description: 'Item description',
  }, */
/*   {
    icon: 'person_pin',
    route: '/Choferes',
    title: 'Choferes',
    description: 'Item description',
  }, */
  {
    icon: 'ballot',
    route: '/cotizacion',
    title: 'Cotizaciones',
    description: 'Item description',
  },
/*   {
    icon: 'ballot',
    route: '/Choferes',
    title: 'Reg. Guias',
    description: 'Item description',
  },
  {
    icon: 'ballot',
    route: '/Choferes',
    title: 'Reg. Compras',
    description: 'Item description',
  }, */

  ];

  /*https://stackblitz.com/edit/example-angular-material-toolbar-menu
  https://stackblitz.com/edit/angular-material-nested-menu-example*/

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }


}
