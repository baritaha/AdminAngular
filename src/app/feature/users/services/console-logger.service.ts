import { Injectable } from '@angular/core';
import Logger from '../../../models/logger.model';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerService implements Logger{

  constructor() {
    console.log("write  console logger message ")
  }

  log(message: string): void {
  console.log(message);
  }
  logError(message: string): void {
   console.log(message);
  }
}
