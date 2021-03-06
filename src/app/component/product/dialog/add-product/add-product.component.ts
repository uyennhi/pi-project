import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/service/brand.service';
import { ProductService } from 'src/app/service/product.service';
import { SnackBarService } from 'src/app/component/common/snack-bar/snack-bar.service';
import { priceValidator, quantityValidator, isNotImage, isFormProductInvalid } from '../../../common/validation/validators';
import { messageServerError } from '../../../common/constrains';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  formEdit: FormGroup;
  brandNamesList: string[];
  productNameChecker : string;
  // Set default value variable
  flagDuplicatedProductName = false;
  flagShowImage = false;
  flagImageFile = true;
  flagRequired = false;
  imageName = '';
  brandNameDefault = 'Apple';

  //upload image
  imageName1 : string;
  parts : string[];
  selectedFile : FileList;
  currentFileUpload : File;


  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService,
    private brandService: BrandService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {

    // Reactive form add product
    this.formEdit = this.fb.group({
      productName: ['', [Validators.required]],
      quantity: [, [Validators.required, quantityValidator]],
      price: [, [Validators.required, priceValidator]],
      brandName: '',
      saleDate: ['', Validators.required],
      description: '',
      image: ['', Validators.required],
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
        this.flagDuplicatedProductName = resp;
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

  onFileSelect(event) {
    console.log(event.target.files[0]['name']);
    let r = Math.random().toString(36).substring(7);
    this.imageName1 = event.target.files[0]['name'];
    this.parts = this.imageName1.split('.');
    this.imageName1 = this.parts[0]+"-"+ r+"."+this.parts[1];
    this.selectedFile = event.target.files;
    console.log(this.imageName1);

  }

  /**
   * Insert product
   * 
   * @param form
   */
  insertProduct(form) {

    // Form validation
   // if (isFormProductInvalid(form, this.flagImageFile, this.imageName)) {
   //   this.flagRequired = true;
    //  return false;
   // }
   form.image = this.imageName1;
    // Get the brand for the form insert
    this.brandService.findBrandByName(form.brandName)
      .subscribe(brand => {
        // Set values for the form
        form.saleDate = new Date(form.saleDate);
        form.image = this.imageName1;
        form.brandEntity = brand;

        // Function insert product
        this.productService.insertProduct(form)
          .subscribe(resp => {
            this.dialogRef.close(resp['message'])
        })
      },
        // If server error
        error => {
          this.snackBar.getSnackBarFail(messageServerError);
        });
        this.currentFileUpload = this.selectedFile.item(0);
        this.brandService.pushFileToStoRage(this.currentFileUpload,this.imageName1).subscribe();
        console.log(form.value);
  }
  
  /**
   * Close dialog
   */
  closeDialog() {
    this.dialogRef.close(null);
  }

}
