import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _apiUrl = "http://localhost:8000/api";
  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers(){
    return this._http.get(`${this._apiUrl}/users`);
  }

  updateUser(data){
    return this._http.put(`${this._apiUrl}/users/${data.id}`,data);
  }

  updateCompany(data){
    return this._http.put(`${this._apiUrl}/companies/${data.id}`,data);
  }

  getUserById(id){
    return this._http.get(`${this._apiUrl}/users/${id}`);
  }
  
  deleteUser(id){
    return this._http.delete(`${this._apiUrl}/users/${id}`);
  }
}
