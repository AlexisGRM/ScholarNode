/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlobalParamsService } from './global-params.service';

describe('GlobalParamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalParamsService]
    });
  });

  it('should ...', inject([GlobalParamsService], (service: GlobalParamsService) => {
    expect(service).toBeTruthy();
  }));
});
