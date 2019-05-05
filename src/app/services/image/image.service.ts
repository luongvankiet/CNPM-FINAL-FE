import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private _apiUrl = 'http://localhost:8000/api/images';
  constructor(
    private _http: HttpClient
  ) { }

  getAllImages(){
    return this._http.get(`${this._apiUrl}`);
  }

  createImage(data){
    return this._http.post(`${this._apiUrl}`, data);
  }

  updateImage(data){
    return this._http.put(`${this._apiUrl}/${data.id}`, data);
  }

  deleteImage(data){
    return this._http.delete(`${this._apiUrl}/${data.id}`);
  }


}
