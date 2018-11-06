import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarTableComponent } from './toolbar-table.component';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { SearchModule } from '../search/search.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FuseSharedModule,
        SearchModule,
        MatButtonModule
    ],
    declarations: [ToolbarTableComponent],
    exports: [ToolbarTableComponent]
})
export class ToolbarTableModule {
}
