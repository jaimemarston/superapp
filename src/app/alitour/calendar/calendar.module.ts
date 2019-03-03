import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {ColorPickerModule} from 'ngx-color-picker';
import {CalendarModule as AngularCalendarModule, DateAdapter} from 'angular-calendar';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseConfirmDialogModule} from '@fuse/components';
import {CalendarComponent} from './calendar.component';
import {CalendarService} from './calendar.service';
import {CalendarEventFormDialogComponent} from './event-form/event-form.component';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {EditcotizaciondetalleModule} from '../cotizacion/cotizaciondetalle/editcotizaciondetalle/editcotizaciondetalle.module';
import { LegendComponent } from './legend/legend.component';

const routes: Routes = [
    {
        path: '**',
        component: CalendarComponent,
        children: [],
        resolve: {
            chat: CalendarService
        }
    }
];

@NgModule({
    declarations: [
        CalendarComponent,
        CalendarEventFormDialogComponent,
        LegendComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatTooltipModule,

        AngularCalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        ColorPickerModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        EditcotizaciondetalleModule,
        MatChipsModule
    ],
    providers: [
        CalendarService
    ],
    entryComponents: [
        CalendarEventFormDialogComponent
    ]
})
export class CalendarModule {
}
