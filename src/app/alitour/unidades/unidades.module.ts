import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule, MatOptionModule, MatPaginatorModule,
    MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatTableModule, MatToolbarModule
} from '@angular/material';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../@fuse/components';
import { ToolbarTableModule } from '../../shared/components/toolbar-table/toolbar-table.module';
import { UnidadesComponent } from './unidades.component';
import { UnidadesListComponent } from './unidades-list/unidades-list.component';
import { UnidadesFormComponent } from './unidades-form/unidades-form.component';
import { ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';


const routes: Routes = [
    {
        path: '',
        component: UnidadesComponent,
        children: [
            {
                path: '',
                component: UnidadesListComponent
            },
            {
                path: 'edit/:id',
                component: UnidadesFormComponent
            },
            {
                path: 'add',
                component: UnidadesFormComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatCardModule,
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
        ActionIconsModule,
        FuseSidebarModule
    ],
    declarations: [UnidadesComponent, UnidadesListComponent, UnidadesFormComponent]
})
export class UnidadesModule {
}
