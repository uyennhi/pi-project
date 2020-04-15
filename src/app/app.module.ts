import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSortModule} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './component/common/nav-bar/nav-bar.component';
import { BrandComponent } from './component/brand/brand.component';
import { BrandService } from './service/brand.service';
import { ProductComponent } from './component/product/product.component';
import { DialogDeleteComponent } from './component/common/dialog-delete/dialog-delete.component';

import { EditBrandComponent } from './component/brand/dialog/edit-brand/edit-brand.component';
import { AddBrandComponent } from './component/brand/dialog/add-brand/add-brand.component';
import { AddProductComponent } from './component/product/dialog/add-product/add-product.component';
import { EditProductComponent } from './component/product/dialog/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BrandComponent,
    ProductComponent,
    DialogDeleteComponent,
    EditBrandComponent,
    AddBrandComponent,
    AddProductComponent,
    EditProductComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    BrandService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
