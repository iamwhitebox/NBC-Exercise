import {
  Component,
  OnInit,
} from '@angular/core';

import { FormControl } from '@angular/forms';

import { StarWarsService } from './starwars.service';

import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';

import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Intergalactic Star Wars Database';

  filteredPeople$: Observable<null>;
  searchInput = new FormControl('');
  searching: boolean;

  constructor(
    private swService: StarWarsService
  ) { }

  ngOnInit() {
    this.filteredPeople$ = this.searchInput
      .valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.searching = true),
        switchMap(value => this.swService.getPeople({ name: value })),
        tap(() => this.searching = false),
      );
  }

  showFilms(person: any) {
    const films = this.swService.getFilms(person);
    films.subscribe(films => person.films = films);
  }

}