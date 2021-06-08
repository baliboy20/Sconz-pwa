import { TestBed } from '@angular/core/testing';

import { GGCartService } from './ggcart.service';

describe('GGCartService', () => {
  let service: GGCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GGCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
