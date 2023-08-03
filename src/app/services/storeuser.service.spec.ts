import { TestBed } from '@angular/core/testing';

import { StoreuserService } from './storeuser.service';

describe('StoreuserService', () => {
  let service: StoreuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
