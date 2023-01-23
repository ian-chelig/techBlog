import { TestBed } from '@angular/core/testing';

import { StrapiServiceService } from './strapi-service.service';

describe('StrapiServiceService', () => {
  let service: StrapiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrapiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
