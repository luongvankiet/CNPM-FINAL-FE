import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private _apiUrl = 'http://localhost:8000/api';
  constructor(
    private _http: HttpClient,
  ) { }
  
  getAllPosts(){
    return this._http.get(`${this._apiUrl}/posts`);
  }

  createPost(data){
    return this._http.post(`${this._apiUrl}/posts`, data);
  }

  editPost(post){
    return this._http.put(`${this._apiUrl}/posts/${post.id}`, post);
  }

  getLatestPosts(){
    return this._http.get(`${this._apiUrl}/latestPosts`);
  }

  getPostsBySlug(slug){
    return this._http.get(`${this._apiUrl}/posts/${slug}`);
  }

  deletePost(id){
    return this._http.delete(`${this._apiUrl}/posts/${id}`);
  }
}
