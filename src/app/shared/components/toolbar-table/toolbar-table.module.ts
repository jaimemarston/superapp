import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarTableComponent } from './toolbar-table.component';
import { FuseSharedModule } from '../../../../@fuse/shared.module';
import { SearchModule } from '../search/search.module';
import { MatButtonModule } from '@angular/material';
import { FuseSearchBarModule } from '../../../../@fuse/components';

@NgModule({
    imports: [
        CommonModule,
        FuseSharedModule,
        SearchModule,
        MatButtonModule,
        FuseSearchBarModule
    ],
    declarations: [ToolbarTableComponent],
    exports: [ToolbarTableComponent]
})
export class ToolbarTableModule {
}
