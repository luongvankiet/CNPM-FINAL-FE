import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _apiUrl = "http://localhost:8000/api/categories";
  constructor(private _http: HttpClient) { }

  getAllCategories(){
    return this._http.get(`${this._apiUrl}`);
  }

  getCategoriesBySlug(slug){
    return this._http.get(`${this._apiUrl}/${slug}`);
  }

  createCategory(data){
    return this._http.post(`${this._apiUrl}`, data);
  }

  editCategory(data){
    return this._http.put(`${this._apiUrl}/${data.id}`, data);
  }

  deleteCategory(data){
    return this._http.delete(`${this._apiUrl}/${data.id}`);
  }
}
