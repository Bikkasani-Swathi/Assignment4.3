import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  watchtime="";
  constructor(public apiService:ApiService){}

  watchhrs(){
    this.apiService.watch().subscribe(response=>{
      console.log(response);
      this.watchtime=JSON.stringify(response);
    })
  }

  total(data:NgForm){
    this.apiService.count(data).subscribe(response=>{
      console.log(response);
    })
  }

  add(data:NgForm){
    this.apiService.add(data).subscribe(response=>{
      console.log(response);
    })
  }

  update(data:NgForm){
    this.apiService.update(data).subscribe(response=>{
      console.log(response);
    })
  }

  delete(form:NgForm){
    this.apiService.delete(form).subscribe(response=>{
      console.log(response);
    })
  }
}
