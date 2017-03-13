/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarreraServiceService } from './carrera-service.service';

describe('CarreraServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarreraServiceService]
    });
  });

  it('should ...', inject([CarreraServiceService], (service: CarreraServiceService) => {
    expect(service).toBeTruthy();
  }));
});
