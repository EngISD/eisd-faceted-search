import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EisdFacetedSearchLibComponent } from './eisd-faceted-search-lib.component';

describe('EisdFacetedSearchLibComponent', () => {
  let component: EisdFacetedSearchLibComponent;
  let fixture: ComponentFixture<EisdFacetedSearchLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EisdFacetedSearchLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EisdFacetedSearchLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
