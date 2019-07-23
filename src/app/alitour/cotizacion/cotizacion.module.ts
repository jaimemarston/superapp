import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CotizacionComponent} from './cotizacion.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS, MatMenuModule, MatRippleModule, MatOptionModule, MatDividerModule,
} from '@angular/material';
import {EditCotizacionComponent} from './cotizacionmaestro/editcotizacion/editcotizacion.component';
import {CotizacionmaestroComponent} from './cotizacionmaestro/cotizacionmaestro.component';
import {CotizaciondetalleComponent} from './cotizaciondetalle/cotizaciondetalle.component';
import {EditcotizaciondetalleComponent} from './cotizaciondetalle/editcotizaciondetalle/editcotizaciondetalle.component';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {ToolbarTableModule} from '../../shared/components/toolbar-table/toolbar-table.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../../@fuse/components';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';
import {EditcotizaciondetalleModule} from './cotizaciondetalle/editcotizaciondetalle/editcotizaciondetalle.module';

const routes: Routes = [
    {
        path: '',
        component: CotizacionComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatOptionModule,
        MatSelectModule,
        FuseSharedModule,
        ToolbarTableModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,
        MatDatepickerModule,
        MatNativeDateModule,         // <----- import(optional)
        MatChipsModule,
        MatSelectModule,
        MatAutocompleteModule,
        RouterModule.forChild(routes),
        ActionIconsModule,
        MatDividerModule,

        EditcotizaciondetalleModule
    ],
    declarations: [
        CotizacionComponent,
        CotizacionmaestroComponent,
        CotizaciondetalleComponent,
        EditCotizacionComponent
    ],
    entryComponents: [
    ],
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}]
})
export class CotizacionModule {
}
