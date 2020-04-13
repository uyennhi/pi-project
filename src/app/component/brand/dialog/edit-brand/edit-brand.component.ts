import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandService } from 'src/app/service/brand.service';
import { SnackBarService } from 'src/app/component/common/snack-bar/snack-bar.service';
import { isNotImage, isFormBrandInvalid } from '../../../common/validation/validators';
import { messageServerError } from '../../../common/constrains';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  formEdit: FormGroup;

  // Set default value variable
  flagShowLogo = true;
  flagImageFile = true;
  flagDuplicatedbrandName = false;
  logoName = this.data['logo'];
  brandNameChecker = this.data['brandName'];

  constructor(
    public dialogRef: MatDialogRef<EditBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private brandService: BrandService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit() {

    // Reactive form edit brand
    this.formEdit = this.fb.group({
      brandId: this.data.brandId,
      brandName: ['', Validators.required],
      logo: '',
      description: [this.data.description]
    })
  }

  /**
   * Check duplicated brand name
   * 
   * @param brandName
   */
  checkDuplicatedBrandName(brandName) {
    // Find brand by brand name
    this.brandService.findBrandByName(brandName)
      .subscribe(brand => {
        brand != null && this.data['brandName'].toLowerCase() != brandName.toLowerCase() ?
        this.flagDuplicatedbrandName = true : this.flagDuplicatedbrandName = false;
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
   * Update brand
   * 
   * @param formEdit
   */
  updateBrand(form) {

    // Set value logo name
    form.logo = this.logoName;

    // Form validation
    if (isFormBrandInvalid(form, this.logoName, this.flagImageFile)) {
      return false;
    }

    // Function update brand
    this.brandService.updateBrand(form)
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
