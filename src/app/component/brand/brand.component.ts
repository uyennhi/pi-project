import { Component, OnInit,ViewChild } from '@angular/core';
import { brand } from '../model/brand.model';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BrandService } from 'src/app/Service/brand.service';
import { messageServerError } from '../common/constrains';
import {MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    private brandService: BrandService
    ) { 
    
  }

  ngOnInit(): void {
    this.searchBrandsList('');
    localStorage.getItem('access_token') != null ?
      this.flagAction = true :
      this.flagAction = false;
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
}
