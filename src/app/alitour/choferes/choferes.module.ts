import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule, MatOptionModule, MatPaginatorModule,
    MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatTableModule, MatToolbarModule
} from '@angular/material';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../@fuse/components';
import { ToolbarTableModule } from '../../shared/components/toolbar-table/toolbar-table.module';
import { ChoferesComponent } from './choferes.component';
import { ChoferesListComponent } from './choferes-list/choferes-list.component';
import { ChoferesFormComponent } from './choferes-form/choferes-form.component';
import { ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';


const routes: Routes = [
    {
        path: '',
        component: ChoferesComponent,
        children: [
            {
                path: '',
                component: ChoferesListComponent
            },
            {
                path: 'edit/:id',
                component: ChoferesFormComponent
            },
            {
                path: 'add',
                component: ChoferesFormComponent
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
    declarations: [ChoferesComponent, ChoferesListComponent, ChoferesFormComponent]
})
export class ChoferesModule {
}
