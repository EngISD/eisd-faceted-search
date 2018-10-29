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


  getSearchedItem(data: string) {
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => {
        return items.filter(items => items.title.toLowerCase().includes(data.toLowerCase()));
      }, error => error)
    );
  }
  getFilteredData(){
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => {
        return items.filter(items => items.title.includes(this.filteredValue.getValue()));
      }, error => error)
    );
  }
  setFilteredValue(value){
    this.filteredValue.next(value);
    this.getFilteredData().subscribe(res => this.selected.next(res))
  }
  getFilteredValue(){
    this.filteredValue.subscribe((val) => val);
    return this.filteredValue.getValue();
  }

  getSelected() {
    this.selected.subscribe((val1) => val1);
    return this.selected.getValue();
  }
}
