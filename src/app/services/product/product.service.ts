import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _apiUrl = "http://localhost:8000/api/products";
  constructor(
    private _http: HttpClient
  ) { }

  getAllProducts(){
    return this._http.get(`${this._apiUrl}`);
  }

  createProduct(data){
    return this._http.post(`${this._apiUrl}`, data);
  }

  editProduct(data){
    return this._http.put(`${this._apiUrl}/${data.id}`, data);
  }

  deleteProduct(data)
  {
    return this._http.delete(`${this._apiUrl}/${data.id}`);
  }
}
