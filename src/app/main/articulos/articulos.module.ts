import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './articulos.component';
import { ArticulosListComponent } from './articulos-list/articulos-list.component';
import { ArticulosFormComponent } from './articulos-form/articulos-form.component';
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
import { ToolbarTableModule } from '../../shared/components/toolbar-table/toolbar-table.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '../../../@fuse/components';

const routes: Routes = [
    {
        path: '',
        component: ArticulosComponent,
        children: [
            {
                path: '',
                component: ArticulosListComponent
            },
            {
                path: 'edit/:id',
                component: ArticulosFormComponent
            },
            {
                path: 'add',
                component: ArticulosFormComponent
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
        FuseSidebarModule
    ],
    declarations: [ArticulosComponent, ArticulosListComponent, ArticulosFormComponent]
})
export class ArticulosModule {
}
