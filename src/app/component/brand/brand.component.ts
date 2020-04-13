import { Component, OnInit,ViewChild } from '@angular/core';
import { brand } from '../model/brand.model';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BrandService } from 'src/app/service/brand.service';
import { messageServerError } from '../common/constrains';
import {MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SnackBarService } from 'src/app/component/common/snack-bar/snack-bar.service';
import { DialogDeleteComponent } from '../common/dialog-delete/dialog-delete.component';
import { AddBrandComponent } from './dialog/add-brand/add-brand.component';
import { EditBrandComponent } from './dialog/edit-brand/edit-brand.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

   brandsList: Array<brand>;
   dataSource: any;
   totalPage: number;
   pageNumbersList: Array<number>;
   flagAction: boolean;

  // Set default value variable
   flagSearch = false;
   currentPage = 0;
   nameSearcher = '';
   flagServerError = false;

  // Columns display
   displayedColumns: string[] = [
    'brandId', 'brandName', 'logo', 'description', 'actions'
  ];
  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private dialog: MatDialog,
    private snackBar: SnackBarService
    ) { 
    
  }

  ngOnInit(): void {
    this.searchBrandsList('');
      this.flagAction = true ;
  }
  receiveEvent() {
    this.ngOnInit();
  }

  searchBrandsList(brandName: string) {

    // Function search brands list
    this.brandService.getBrandsByPageable(this.currentPage, brandName)
      .subscribe(resp => {
        // Set data table
        this.brandsList = resp['responseData'],
        this.pageNumbersList = resp['pageNumbersList'],
        this.totalPage = resp['totalPage'],
        this.dataSource = new MatTableDataSource(this.brandsList),
        this.dataSource.sort = this.sort
      },
        
        // If server error
        error => {
          this.flagServerError = true;
        })
    
    // If using search
    if (brandName != '') {
      this.flagSearch = true;
    }
  }

  setPageChange(currentPage: any) {
    this.currentPage = currentPage;
    this.flagSearch ? this.searchBrandsList(this.nameSearcher) :
    this.searchBrandsList('');
  }
  //add-brand
  insertBrand() {

    // Open dialog
    let dialogRef = this.dialog.open(AddBrandComponent, {
      maxHeight: '95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.snackBar.getSnackBarSuccess(result)

        // Refresh data table
        this.ngOnInit();
      }
    })
  }
//update brand
updateBrand(brand) {

  // Open dialog
  let dialogRef = this.dialog.open(EditBrandComponent, {
    data: brand,
    maxHeight: '95vh'
  })
  dialogRef.afterClosed().subscribe(result => {
    if (result != null) {
      this.snackBar.getSnackBarSuccess(result)

      // Refresh data table
      this.ngOnInit();
    }
  })
}

  //delete brand
  deleteBrand(brand) {

    // Open dialog
    let dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: brand
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        // Function delete brand
        this.brandService.deleteBrand(brand)
          .subscribe(resp => {
            this.snackBar.getSnackBarSuccess(resp['message'])

            // Refresh data table
            this.ngOnInit();
          },
            // Catch delete error
            error => {
              (error instanceof HttpErrorResponse && error.status === 500) ?
              // If the brand already exists in the products list
              this.snackBar.getSnackBarFail('Cannot delete brand') :
              // If server error
              this.snackBar.getSnackBarFail(messageServerError)
            })
      }
    })
  }
}
