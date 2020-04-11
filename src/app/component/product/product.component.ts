import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { FormBuilder, FormGroup } from '@angular/forms';
import { product } from '../model/product.model';
import { ProductService } from 'src/app/service/product.service';
import { BrandService } from 'src/app/service/brand.service';
import { SnackBarService } from '../common/snack-bar/snack-bar.service';
import { DialogDeleteComponent } from '../common/dialog-delete/dialog-delete.component';
import { messageServerError } from '../common/constrains';
import { isUnablePrice } from '../common/validation/validators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  formSearch: FormGroup;
  productsList: product[];
  dataSource: any;
  totalPage: number;
  brandNamesList: string[];
  pageNumbersList: Array<number>;
  flagAction: boolean;

  // Set default value variable
  currentPage = 0;
  flagSearch = false;
  flagServerError = false;

  // Columns display
  displayedColumns: string[] = [
    'productId', 'productName', 'quantity', 'price', 'brandEntity', 'saleDate', 'image', 'actions'
  ];

   // Form search null
  formSearchNull = { 'productName': '', 'brandName': '', 'priceFrom': 0, 'priceTo': 0 };
  constructor(private service: ProductService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: SnackBarService,
    private brandService: BrandService,) { }

  ngOnInit() {
    // Get products first page
    this.searchProductsList(this.formSearchNull)

    // Reactive form search products
    this.formSearch = this.fb.group({
      productName: '',
      brandName: '',
      priceFrom: 0,
      priceTo: 0
    })

    // Set data for brand name select
    this.brandService.getAllBrandName()
      .subscribe(brandNames => {
        this.brandNamesList = brandNames
      })

    // Display actions
    
  }

  searchProductsList(body: any) {

    // Price validation
    if (isUnablePrice(body)) {
      this.snackBar.getSnackBarFail('Unable to determine price')
      return false;
    }

    // Function search products list
    this.service.getProductsByPageable(this.currentPage, body)
      .subscribe(resp => {
        // Set data table
        this.productsList = resp['responseData'],
        this.pageNumbersList = resp['pageNumbersList'],
        this.totalPage = resp['totalPage'],
        this.dataSource = new MatTableDataSource(this.productsList),
        this.dataSource.sort = this.sort
      },
        // If server error
        error => {
          this.flagServerError = true;
        })

    // If using search
    if (body.productName != '' || body.brandName != '' || body.priceFrom != 0 || body.priceTo != 0) {
      this.flagSearch = true;
    }
  }
//set page change
  setPageChange(currentPage: number) {
    this.currentPage = currentPage;
    this.flagSearch ? this.searchProductsList(this.formSearch.value) : 
    this.searchProductsList(this.formSearchNull)
  }
}
