import { Injectable, OnInit } from '@angular/core';
import Logger from '../../../models/logger.model';

@Injectable({
  providedIn: 'root'
})
export class FileLoggerService implements Logger {

  constructor() {
    console.log('write  File logger message ');
  }

  log(message: string): void {
    console.log(message);
    }
    logError(message: string): void {
     console.log(message);
    }
}
