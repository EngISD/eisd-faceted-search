import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  dataUrl = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';

  // for testing of the sorting and slicing mechanism (it works)
  // dataUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) { }
  getCategories() {
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => Object.keys(items[0]) )
    );
  }
  getCheckboxes(category?: string) {
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => {
        const temp = [];
        for (let i = 0; i < items.length; i++) {
          temp.push(items[i][category]);
        }
        const counted: Array<any> = temp.reduce(function (acc, item) {
          if (acc[item]) {
              acc[item]++;
          } else {
              acc[item] = 1;
          }
          return acc;
        }, {});
        const array = Object.keys(counted).map(function (k) {
          return { id: k, count: counted[k]};
        });
        array.sort(function (a, b) { return b.count - a.count; });
        return array.slice(0, 10);
      })
    );
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
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => {
        return items.filter(res => res.title.toLowerCase().includes(data.toLowerCase()));
      }, error => error)
    );
  }

  getParamsForFacets(category: string) {
    return this.http.get<Array<any>>(this.dataUrl)
            .pipe(
              map(items => items.filter(res => res.title.toLowerCase().includes(category.toLowerCase())) )
            );
  }
}
