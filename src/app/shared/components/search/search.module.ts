import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FuseSharedModule } from '../../../../@fuse/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FuseSharedModule
    ],
    declarations: [SearchComponent],
    exports: [SearchComponent]
})
export class SearchModule {
}
