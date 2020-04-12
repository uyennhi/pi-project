import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/service/brand.service';
import { SnackBarService } from 'src/app/component/common/snack-bar/snack-bar.service';
import { isNotImage, isFormBrandInvalid } from '../../../common/validation/validators';
import { messageServerError } from '../../../common/constrains';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

 formEdit: FormGroup;
  logoName: string;
  brandNameChecker :string;

  // Set default value variable
  flagShowLogo = false;
  flagImageFile = true;
  flagDuplicatedbrandName = false;
  flagRequired = false;

  constructor(
    public dialogRef: MatDialogRef<AddBrandComponent>,
    private fb: FormBuilder,
    private brandService: BrandService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {

    // Reactive form add product
    this.formEdit = this.fb.group({
      brandName: ['', Validators.required],
      description: [''],
      logo: ['', Validators.required]
    })
  }

  /**
   * Check brand name if exists
   * 
   * @param brandName
   */
  checkDuplicatedBrandName(brandName) {
    // Find brand by brand name
    this.brandService.findBrandByName(brandName)
      .subscribe(brand => {
        brand != null ? this.flagDuplicatedbrandName = true :
        this.flagDuplicatedbrandName = false;
      })
  }

  /**
   * Change logo and get logo name
   */
  changeLogo(logo) {
    const fileFormat = logo.substring(logo.lastIndexOf('.') + 1);

    // If not image file
    if (isNotImage(fileFormat)) {
      this.flagImageFile = false;
      this.flagShowLogo = false;
    } else {
      this.logoName = logo.substring(12);
      this.flagImageFile = true;
      this.flagShowLogo = true;
    }
  }

  /**
   * Insert brand
   * 
   * @param formEdit
   */
  insertBrand(form) {

    // Set value logo name
    form.logo = this.logoName;

    // Form validation
    if (isFormBrandInvalid(form, this.logoName, this.flagImageFile)) {
      this.flagRequired = true;
      return false;
    }

    // Function insert brand
    this.brandService.insertBrand(form)
      .subscribe(resp => {
          this.dialogRef.close(resp['message'])
      },
        // If server error
        error => {
          this.snackBar.getSnackBarFail(messageServerError)
        })
  }

  /**
   * Close dialog
   */
  closeDialog() {
    this.dialogRef.close(null)
  }

}
