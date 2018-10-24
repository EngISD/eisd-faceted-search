import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  dataUrl: string = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';

  constructor(private http: HttpClient) { }

  getResults(){
    return this.http.get(this.dataUrl);
  }
  getResult(resultId: number){
    return this.http.get(this.dataUrl + '/' + resultId);
  }
}
