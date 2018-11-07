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
  dataUrl: string = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';

  // Variables that track the changes made on search
  filterValue$: Observable<any>;
  private _filterValue: BehaviorSubject<any>;
  private categories = [];

  constructor(private http: HttpClient) {
    this._filterValue = new BehaviorSubject<any>([]);
    this.filterValue$ = this._filterValue.asObservable();

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
  // Idea to search by facets
  // getSearchArray(arr: Array<string>) {
  //   return this.http.get<Array<any>>(this.dataUrl).pipe(
  //     map(items => {
  //       return items.filter(res => {
  //         for (let i = 0; i < arr.length; i++) {
  //           if (res['title'].toString().toLowerCase().includes(arr[i].toLowerCase())) {
  //             return true;
  //           }
  //          }
  //       });
  //     }, error => error)
  //   );
  // }
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
  getRealData(pageSize, pageIndex) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Array<any>>('http://161.27.12.15:8180/proto_co/api/internal_order/list?size=' + pageSize + '&page=' + (pageIndex + 1)).pipe(
      map(items => {
        return items['data'];
      }, error => error)
    );
  }
  getCountOfAll() {
    return this.http.get<Array<any>>('http://161.27.12.15:8180/proto_co/api/internal_order/list?').pipe(
      map(items => {
        return items['count'];
      }, error => error)
    );
  }
  getFacets(category) {
    return this.http.get<Array<any>>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facet=' + category).pipe(
      map(items => {
        return items;
      }, error => error)
    );
  }
  getMoreFacets(category, num) {
    return this.http.get<Array<any>>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facetMaxOptions=' + num*10 + '&facet=' + category).pipe(
      map(items => {
        return items;
      }, error => error)
    );
  }

  refreshFacets(category, selection) {
      let dud = '';
      const temp = selection;
      Object.entries(temp).forEach(
        ([key, value]) => {
          Object.entries(value).forEach(
            ([key1, value1]) => {
              dud = dud.concat('&', key, '=', value1.toString());
            }
          );
        }
      );
      return this.http.get<Array<any>>('http://161.27.12.15:8180/proto_co/api/internal_order/facet?facet=' + category + dud).pipe(
        map(items => {
          return items;
        }, error => error)
      );
  }
  sortAllResults(value, pageSize, pageIndex, desc){
    let res = '';
    res = res.concat('&order=', value.toString());
    return this.http.get<Array<any>>('http://161.27.12.15:8180/proto_co/api/internal_order/list?' + pageSize + '&page=' + (pageIndex + 1) + res + '&asc=' + !desc)
    .pipe(
      map(items => {
        return items['data'];
      }, error => error)
    );
  }

}
