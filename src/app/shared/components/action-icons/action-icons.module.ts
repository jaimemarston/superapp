import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionIconsComponent } from './action-icons.component';
import { MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule
    ],
    declarations: [ActionIconsComponent],
    exports: [ActionIconsComponent]
})
export class ActionIconsModule {
}
