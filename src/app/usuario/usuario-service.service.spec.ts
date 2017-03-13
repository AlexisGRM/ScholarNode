/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsuarioServiceService } from './usuario-service.service';

describe('UsuarioServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioServiceService]
    });
  });

  it('should ...', inject([UsuarioServiceService], (service: UsuarioServiceService) => {
    expect(service).toBeTruthy();
  }));
});
