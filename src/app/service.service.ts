import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  filteredValue = new BehaviorSubject<any>([]);
  selected = new BehaviorSubject<any>([]);

  dataUrl: string = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';

  filterValue$: Observable<any>
  private _filterValue: BehaviorSubject<any>

  constructor(private http: HttpClient) {
    this._filterValue = new BehaviorSubject<any>([]);
    this.filterValue$ = this._filterValue.asObservable();
   }
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
  getSearchedItem(data: string) {
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => {
        return items.filter(res => res.title.toLowerCase().includes(data.toLowerCase()));
      }, error => error)
    );
  }
  getFilteredData() {
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => {
        return items.filter(items => items.title.includes(this.filteredValue.getValue()));
      }, error => error)
    );
  }
  setFilteredValue(value){
    this.filteredValue.next(value);
    this.getFilteredData().subscribe(res => this._filterValue.next(res));
  }
}
