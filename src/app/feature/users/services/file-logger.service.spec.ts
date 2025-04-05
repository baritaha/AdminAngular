import { TestBed } from '@angular/core/testing';

import { FileLoggerService } from './file-logger.service';

describe('FileLoggerService', () => {
  let service: FileLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
