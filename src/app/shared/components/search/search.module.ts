import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { FuseSharedModule } from '../../../../@fuse/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FuseSharedModule,
        MatInputModule
    ],
    declarations: [SearchComponent],
    exports: [SearchComponent]
})
export class SearchModule {
}
