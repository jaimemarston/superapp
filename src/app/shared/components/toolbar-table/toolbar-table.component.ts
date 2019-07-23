import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BASEURL } from '../../../../environments/environment';
import { MatDialog } from '@angular/material';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

@Component({
    selector: 'toolbar-table',
    templateUrl: './toolbar-table.component.html',
    styleUrls: ['./toolbar-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ToolbarTableComponent implements OnInit {

    @Input() search = true;
    @Input() urlPrint;
    @Input() title: string;

    @Output() add: EventEmitter<any> = new EventEmitter();
    @Output() printing: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() duplicar: EventEmitter<any> = new EventEmitter();
    @Output() fileSelected: EventEmitter<any> = new EventEmitter();

    @Output() inputText: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

    print_pdf(): void {
        if (this.urlPrint) {
            window.open(`${BASEURL}${this.urlPrint}`, '_blank');
            // window.location.replace(`${BASEURL}${this.urlPrint}`);
        }
    }

    confirmar(): void {
        const dialogRef = this.dialog.open(ConfirmarComponent, {
            width: '250px',
            data: {}
          });
      
          dialogRef.afterClosed().pipe(confirmado => confirmado).subscribe(confirmado => {
              if (confirmado) {
                this.duplicar.emit(true);
              }
          });
    }

    uploadFile(): void {
        const dialogRef = this.dialog.open(UploadFileComponent, {
            data: {}
          });
      
          dialogRef.afterClosed().pipe(data => data).subscribe(data => {
              if (data) {
                  this.fileSelected.emit(data);
              }
          });
    }

}
