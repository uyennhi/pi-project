import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { brand } from '../component/model/brand.model';
import { serverUrl } from '../component/common/constrains';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  /**
   * Send request to get brands by pageable
   */
  getBrandsByPageable(page: number, name: string) {
    const url = serverUrl + 'brand/general/get-brands?page=' + page + '&name=' + name;
    return this.http.get(url)
  }

  /**
   * Send request to find brand by name
   * 
   * @param brandName
   */
  findBrandByName(brandName: string) {
    const url = serverUrl + 'brand/general/find-brand-by-name/' + brandName;
    return this.http.get<brand>(url);
  }

  /**
   * Send request to get all brand name
   */
  getAllBrandName() {
    const url = serverUrl + 'brand/general/get-all-brand-name'
    return this.http.get<string[]>(url);
  }

  /**
   * Send request to insert brand
   * 
   * @param body
   */
  insertBrand(body) {
    const url = serverUrl + 'brand/admin/insert-brand';
    return this.http.post(url, body)
  }

  /**
   * Send request to update brand
   * 
   * @param body
   */
  updateBrand(body) {
    const url = serverUrl + 'brand/admin/update-brand';
    return this.http.put(url, body)
  }

  /**
   * Send request to delete brand
   * 
   * @param body
   */
  deleteBrand(body) {
    const url = serverUrl + 'brand/admin/delete-brand';
    return this.http.post(url, body);
  }
}