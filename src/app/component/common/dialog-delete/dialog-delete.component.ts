import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  name: string;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    // If that is a product name
    if (this.data.productName != undefined) {
      this.name = this.data.productName
    }

    // If that is a brand name
    if (this.data.brandName != undefined) {
      this.name = this.data.brandName
    }
  }

  /**
   * Confirm delete product
   */
  confirmDelete() {
    this.dialogRef.close("delete");
  }

  /**
   * Close dialog
   */
  closeDialg() {
    this.dialogRef.close(null);
  }

}
