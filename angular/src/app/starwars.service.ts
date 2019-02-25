import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

export interface searchQuery {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsService {

  constructor(private http: HttpClient) { }

  getPeople(query: searchQuery): Observable<any> {
    return this.http.get<any>(`/API/v1/star-wars?param=${query.name}`);
  }


  getFilms(person: any): any {
    const urls = person.films;
    const promises = urls.map(url => this.http.get(url));

    return forkJoin(promises);
  }
}
