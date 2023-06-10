import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  
  public add(data:NgForm):Observable<any>{
    return this.http.post("http://localhost:4000/add",data.value);
  }

  public update(data:NgForm):Observable<any>{
    return this.http.patch(`http://localhost:4000/update/${data.controls['name'].value}`,data.value);
  }

  public delete(data:NgForm):Observable<any>{
    return this.http.delete(`http://localhost:4000/delete/${data.controls['tournament'].value}`);
  }

  public watch():Observable<any>{
    return this.http.get("http://localhost:4000/highest")
  }

  public count(data:NgForm):Observable<any>{
    return this.http.get(`http://localhost:4000/total/${data.controls['name'].value}`);
  }
}
