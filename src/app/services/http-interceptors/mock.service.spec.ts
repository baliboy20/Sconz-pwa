import { TestBed } from '@angular/core/testing';

import { HttpInterceptorForMockService } from './mock-service-interceptor.service';

describe('MockService', () => {
  let service: HttpInterceptorForMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterceptorForMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
