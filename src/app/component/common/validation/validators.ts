import { AbstractControl } from "@angular/forms";

/**
 * Custom validation price
 * 
 * @param control
 */
export function priceValidator(control: AbstractControl): {[key: string]: any} | null {
  const price: number = control.value;
  if (price < 0) {
    return {'priceValidator': true}
  }
  return null;
}

/**
 * Custom validation quantity
 * 
 * @param control
 */
export function quantityValidator(control: AbstractControl): {[key: string]: any} | null {
    const quantity: number = control.value;
    if (quantity < 0 || quantity > 500) {
      return {'quantityValidator': true}
    }
    return null;
}

/**
 * Validation price
 * 
 * @param body
 */
export function isUnablePrice(body: any) {
  if (body.priceFrom != 0 && body.priceTo != 0 &&
      body.priceFrom.length === body.priceTo.length + 1 ||
      body.priceFrom.length === body.priceTo.length &&
      body.priceFrom > body.priceTo) {
    return true;
  }
  return false;
}

/**
 * If not image file
 * 
 * @param file 
 */
export function isNotImage(file: string) {
  if (file != 'jpg' && file != 'png' && file != 'jpeg' &&file != 'gif' &&
      file != 'tiff' && file != 'pjp' && file != 'pjpeg' && file != 'jfif' &&
      file != 'tif' && file != 'bmp') {
    return true;
  }
  return false;
}

/**
 * Validation form product
 * 
 * @param form
 * @param flagImageFile
 * @param imageName
 */
export function isFormProductInvalid(form: any, flagImageFile: boolean, imageName: string) {
  if (form.productName === '' || form.productName === undefined ||
      form.quantity === '' || form.quantity === null || form.quantity < 0 || form.quantity > 500 ||
      form.price === '' || form.price === null || form.price < 0 ||
      form.saleDate === '' || !flagImageFile || imageName === '') {
    return true;
  }
  return false;
}

/**
 * Validation form brand
 * 
 * @param form
 * @param logoName
 * @param flagImageFile
 */
export function isFormBrandInvalid(form: any, logoName: string, flagImageFile: boolean) {
  if (form.brandName === '' || form.brandName === undefined ||
      logoName === '' || !flagImageFile) {
    return true;
  }
  return false;
}