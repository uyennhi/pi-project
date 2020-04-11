import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  /**
   * Snackbar success
   * 
   * @param message 
   */
  getSnackBarSuccess(message: string) {
    return this.snackBar.open(message, 'X', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snack-bar-success']
    })
  }

  /**
   * Snackbar fail
   * 
   * @param message 
   */
  getSnackBarFail(message: string) {
    return this.snackBar.open(message, 'X', {
      duration: 3000,
      panelClass: ['snack-bar-fail'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    })
  }
}