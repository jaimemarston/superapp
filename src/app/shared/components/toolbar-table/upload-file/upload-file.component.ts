import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UploadFileComponent>
  ) { }

  ngOnInit(): void {
  }

  upload(event: any): void {
    this.dialogRef.close(event.target.files[0]);
  }

}
