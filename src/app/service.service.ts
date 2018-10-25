import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

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

  /* getFilterBy(data: string) {
    return this.http.get(this.dataUrl).pipe(
      map(items => {
        return items.filter(items => items[data] > 2000);
      }, error => error)
    );
  } */

  getSearchedItem(data: string) {
    return this.http.get(this.dataUrl).pipe(
      map(items => {
        // this prints an error "Property 'filter' does not exist on type 'Object'." but works
        // after doing some research i think it shows error because Angular 7 returns an object
        // from http.get, on link bellow is some kind of explanation
        // https://stackoverflow.com/questions/52989723/angular-7-http-get-returning-object-object
        return items.filter(items => items.title.toLowerCase().includes(data.toLowerCase()));
      }, error => error)
    );
  }
}
