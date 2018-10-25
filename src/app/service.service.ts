import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  dataUrl: string = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';

  // for testing of the sorting and slicing mechanism (it works)
  //dataUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) { }
  getRawResults() {

    return this.http.get(this.dataUrl);
  }
  getResults(event) {
    return this.http.get(this.dataUrl);
  }
  getResult(resultId: number) {
    return this.http.get(this.dataUrl + '/' + resultId);
  }
}
