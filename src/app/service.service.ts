import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // Variable that shares the value with all components
  filteredValue = new BehaviorSubject<any>([]);
  // Link providing the results from a JSON file or a database
  /* dataUrl = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json'; */
  dataUrl = 'https://jsonplaceholder.typicode.com/users';
  // Variables that track the changes made on search
  filterValue$: Observable<any>;
  private _filterValue: BehaviorSubject<any>;
  private categories = [];
  _itemValue = new BehaviorSubject<any>([]);
  itemValue$: Observable<any>;
  // demo search variable
  _searchValue = new BehaviorSubject<any>([]);
  searchValue$: Observable<any>;

  _clean = new BehaviorSubject<any>([]);
  clean$: Observable<any>;

  constructor(private http: HttpClient) {
    this._filterValue = new BehaviorSubject<any>([]);
    this.filterValue$ = this._filterValue.asObservable();
    this.itemValue$ = this._itemValue.asObservable();
    this.searchValue$ = this._searchValue.asObservable();
    this.clean$ = this._clean.asObservable();

    this.getCategories().subscribe(res => {
      this.categories = res;
    });
   }
  // Extracts keys from results
  getCategories() {
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => Object.keys(items[0]) )
    );
  }
  // Extracts fields for each category
  getCheckboxes(category?: string) {
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => {
        const temp = [];
        for (let i = 0; i < items.length; i++) {
          temp.push(items[i][category]);
        }
        if (Array.isArray(temp[0])) {
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
          return array;
        } else {
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
          return array;
        }
      })
    );
  }
  // Fetches all results
  getResults(event?) {
    return this.http.get(this.dataUrl);
  }
  // Fetches results for the autocomplete dropdown by search value
  getSearchedItem(data: string) {
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => {
        return items.filter(res => {
          for (let i = 0; i < this.categories.length; i++) {
            if (res[this.categories[i]].toString().toLowerCase().includes(data.toLowerCase())) {
                  return true;
              }
           }
        });
      }, error => error)
    );
  }
  // Fetches filtered results
  getFilteredData() {
    return this.http.get<Array<any>>(this.dataUrl).pipe(
      map(items => {
        return items.filter(res => {
                for (let i = 0; i < this.categories.length; i++) {
                  if (res[this.categories[i]].toString().toLowerCase().includes(this.filteredValue.getValue().toLowerCase())) {
                        return true;
                    }
                 }
        });
      }, error => error)
    );
  }
  // Sets the value which is used to filter results
  setFilteredValue(value) {
    this.filteredValue.next(value);
    this.getFilteredData().subscribe(res => this._filterValue.next(res));
  }
  // Pushes a specific item
  pushObject(data) {
    this._filterValue.next(data);
  }







  // DEMO SERVICE
  // tslint:disable:max-line-length

  refreshFacets(category, selection, num?) {
    if (num === undefined) {
      num = 1;
    }
    let facet = '';
    let search = '';
    const temp = selection;
    Object.entries(temp).forEach(
      ([key, value]) => {
        if (key !== category) {
          if (key === 'internalOrder') {
            search = search.concat('&internalOrderText=' + encodeURIComponent(value.toString()));
          } else {
            Object.entries(value).forEach(
              ([key1, value1]) => {
                facet = facet.concat('&', key, '=', encodeURIComponent(value1.toString()));
              }
            );
          }
        }
      }
    );
    if (category === 'anno') {
      return this.http.get<Array<any>>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facetMaxOptions=10&facet=' + category + facet + search);
    }
    return this.http.get<Array<any>>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facetMaxOptions=' + num * 5 + '&facet=' + category + facet + search);
  }
  sortAllResults(value, pageSize, pageIndex, desc, facets?) {
    let res = '';
    let facet = '';
    let search = '';
    if (facets !== undefined) {
      Object.entries(facets).forEach(
        ([key1, value1]) => {
          if (key1 === 'internalOrder') {
            search = search.concat('&internalOrderText=' + encodeURIComponent(value1.toString()));
          } else {
            Object.entries(value1).forEach(
              ([key2, value2]) => {
                facet = facet.concat('&', key1, '=', encodeURIComponent(value2.toString()));
              }
            );
          }
        }
      );
    }
    res = res.concat('&order=', value.toString());
    return this.http.get<Array<any>>('http://161.27.12.15:8180/proto_co/api/internal_order/list?size=' + pageSize + '&page=' + (pageIndex + 1) + res + '&asc=' + !desc + facet + search);
  }
  receiveValue(item) {
    this.itemValue$ = item;
  }
  setValueSearch(value) {
    this._searchValue.next(value);
  }
  setClean(value) {
    this._clean.next(value);
  }
  getValuesBySearchText(text) {
    return this.http.get<any>('http://161.27.12.15:8180/proto_co/api/internal_order/list?size=10&page=1&internalOrderText=' + text);
  }
  getValuesByCustomerText(text){
    return this.http.get<any>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facetMaxOptions=5&facet=cliente&customerText=' + text);
  }
  getValuesByCostCenterText(text){
    return this.http.get<any>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facetMaxOptions=5&facet=cdc&cdcText=' + text);
  }
  getValuesByResponsibleText(text){
    return this.http.get<any>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facetMaxOptions=5&facet=rcdc&rcdcText=' + text);
  }
  getValuesByProjectManagerText(text){
    return this.http.get<any>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facetMaxOptions=5&facet=cp&cpText=' + text);
  }
  getValuesByCommercialText(text){
    return this.http.get<any>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facetMaxOptions=5&facet=fun&funText=' + text);
  }
}
