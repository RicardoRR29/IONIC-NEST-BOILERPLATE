/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';
import { ErrorTranslatorService } from './error-translator.service';

describe('ErrorTranslatorService', () => {
  let service: ErrorTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorTranslatorService);
  });

  it('should translate known code', () => {
    expect(service.translate('AUTH_001')).toBe('E-mail ou senha incorretos.');
  });

  it('should fallback for unknown', () => {
    expect(service.translate('UNKNOWN')).toBe('Algo deu errado. Tente novamente.');
  });
});
