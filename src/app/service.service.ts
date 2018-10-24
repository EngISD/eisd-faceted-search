import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  dataUrl: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getResults(){
    return this.http.get(this.dataUrl);
  }
  getResult(resultId: number){
    return this.http.get(this.dataUrl + '/' + resultId);
  }
}
