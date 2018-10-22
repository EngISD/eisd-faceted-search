import { TestBed, inject } from '@angular/core/testing';

import { EisdFacetedSearchLibService } from './eisd-faceted-search-lib.service';

describe('EisdFacetedSearchLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EisdFacetedSearchLibService]
    });
  });

  it('should be created', inject([EisdFacetedSearchLibService], (service: EisdFacetedSearchLibService) => {
    expect(service).toBeTruthy();
  }));
});
