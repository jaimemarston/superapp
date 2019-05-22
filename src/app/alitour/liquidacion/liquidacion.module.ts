import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LiquidacionComponent} from './liquidacion.component';
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
import {EditLiquidacionComponent} from './liquidacionmaestro/editliquidacion/editliquidacion.component';
import {LiquidacionmaestroComponent} from './liquidacionmaestro/liquidacionmaestro.component';
import {LiquidaciondetalleComponent} from './liquidaciondetalle/liquidaciondetalle.component';
import {EditliquidaciondetalleComponent} from './liquidaciondetalle/editliquidaciondetalle/editliquidaciondetalle.component';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {ToolbarTableModule} from '../../shared/components/toolbar-table/toolbar-table.module';
import {FuseConfirmDialogModule, FuseSidebarModule} from '../../../@fuse/components';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';
import {EditliquidaciondetalleModule} from './liquidaciondetalle/editliquidaciondetalle/editliquidaciondetalle.module';

const routes: Routes = [
    {
        path: '',
        component: LiquidacionComponent
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

        EditliquidaciondetalleModule
    ],
    declarations: [LiquidacionComponent, LiquidacionmaestroComponent, LiquidaciondetalleComponent, EditLiquidacionComponent],
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2000}}]
})
export class LiquidacionModule {
}
