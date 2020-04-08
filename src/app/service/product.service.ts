import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../Component/common/constrains';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Send request to get products by pageable
   * 
   * @param page
   * @param body
   */
  getProductsByPageable(page: number, body: any) {
    const url = serverUrl + 'product/general/get-products?page=' + page;
    return this.http.post(url, body);
  }

  /**
   * Send request to check product name already exists
   * 
   * @param productName
   */
  isExistProductName(productName: string) {
    const url = serverUrl + 'product/general/is-exist-product-name/' + productName;
    return this.http.get<boolean>(url);
  }

  /**
   * Send request to insert product
   * 
   * @param body
   */
  insertProduct(body) {
    const url = serverUrl + 'product/admin/insert-product';
    return this.http.post(url, body);
  }

  /**
   * Send request to update product
   * 
   * @param body
   */
  updateProduct(body) {
    const url = serverUrl + 'product/admin/update-product';
    return this.http.put(url, body);
  }

  /**
   * Send request to delete product
   * 
   * @param body
   */
  deleteProduct(body) {
    const url = serverUrl + 'product/admin/delete-product';
    return this.http.post(url, body);
  }
}