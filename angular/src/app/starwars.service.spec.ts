import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StarWarsService } from './starwars.service';

describe('StarwarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: StarWarsService = TestBed.get(StarWarsService);
    expect(service).toBeTruthy();
  });

  it('expects service to get data from api',
    async(inject([HttpTestingController, StarWarsService],
      (httpMock: HttpTestingController, service: StarWarsService) => {
        service.getPeople({ name: '' }).subscribe(data => {
          expect(data.results.length).toBe(10);
        });
      })
    ));
});
