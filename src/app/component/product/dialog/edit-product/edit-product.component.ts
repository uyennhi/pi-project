import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/service/brand.service';
import { ProductService } from 'src/app/service/product.service';
import { SnackBarService } from 'src/app/component/common/snack-bar/snack-bar.service';
import { quantityValidator, priceValidator, isNotImage, isFormProductInvalid } from '../../../common/validation/validators';
import { messageServerError } from '../../../common/constrains';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  formEdit: FormGroup;
  brandNamesList: string[];

  // Set default value variable
  flagDuplicatedProductName = false;
  flagShowImage = true;
  flagImageFile = true;
  brandNameDefault = this.data.brandEntity['brandName'];
  imageName = this.data['image'];
  productNameChecker = this.data['productName'];
  dateDefault = new Date(this.data['saleDate']);

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private brandService: BrandService,
    private productService: ProductService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {

    // Reactive form edit product
    this.formEdit = this.fb.group({
      productId: this.data.productId,
      productName: ['', Validators.required],
      quantity: [this.data.quantity, [Validators.required, quantityValidator]],
      price: [this.data.price, [Validators.required, priceValidator]],
      brandName: '',
      saleDate: ['', Validators.required],
      description: this.data.description,
      image: '',
    })

    // Get data for brand name select
    this.brandService.getAllBrandName()
      .subscribe(brandNames => {
        this.brandNamesList = brandNames
      })
  }

  /**
   * Check duplicated product name
   * 
   * @param productName
   */
  checkDuplicatedProductName(productName) {
    // Function check duplicated
    this.productService.isExistProductName(productName)
      .subscribe(resp => {
        resp && this.data['productName'].toLowerCase() != productName.toLowerCase() ? 
        this.flagDuplicatedProductName = true : this.flagDuplicatedProductName = false;
      })
  }

  /**
   * Change image and get image name
   * 
   * @param img
   */
  changeImage(img) {
    const fileFormat = img.substring(img.lastIndexOf('.') + 1);

    // If not image file
    if (isNotImage(fileFormat)) {
      this.flagImageFile = false;
      this.flagShowImage = false;
    } else {
      this.imageName = img.substring(12);
      this.flagImageFile = true;
      this.flagShowImage = true;
    }
  }

  /**
   * Update product
   * 
   * @param form
   */
  updateProduct(form) {

    // Form validation
    if (isFormProductInvalid(form, this.flagImageFile, this.imageName)) {
      return false;
    }

    // Get the brand for the form update
    this.brandService.findBrandByName(form.brandName)
      .subscribe(brand => {
        // Set values for the form
        form.saleDate = new Date(form.saleDate);
        form.image = this.imageName;
        form.brandEntity = brand;

        // Function update product
        this.productService.updateProduct(form)
          .subscribe(resp => {
            this.dialogRef.close(resp['message'])
          })
      },
        // If server error
        error => {
          this.snackBar.getSnackBarFail(messageServerError);
        })
  }
  
  /**
   * Close dialog
   */
  closeDialog() {
    this.dialogRef.close(null);
  }

}
