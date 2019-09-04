import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GuiasComponent } from './guias.component';
import { GuiasListComponent } from './guias-list/guias-list.component';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule, MatOptionModule, MatPaginatorModule,
    MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatTableModule, MatToolbarModule
} from '@angular/material';
import { FuseSharedModule } from '../../../@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../@fuse/components';
import { ToolbarTableModule } from '../../shared/components/toolbar-table/toolbar-table.module';
import { GuiasFormComponent } from './guias-form/guias-form.component';
import {ActionIconsModule} from '../../shared/components/action-icons/action-icons.module';

const routes: Routes = [
    {
        path: '',
        component: GuiasComponent,
        children: [
            {
                path: '',
                component: GuiasListComponent
            },
            {
                path: 'edit/:id',
                component: GuiasFormComponent
            },
            {
                path: 'add',
                component: GuiasFormComponent
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
        MatCardModule,
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
    declarations: [GuiasComponent, GuiasListComponent, GuiasFormComponent]
})
export class GuiasModule {
}
