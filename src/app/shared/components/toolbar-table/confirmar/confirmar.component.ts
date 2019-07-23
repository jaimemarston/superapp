import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.scss']
})
export class ConfirmarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarComponent>
  ) { }

  ngOnInit(): void {
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }

}
