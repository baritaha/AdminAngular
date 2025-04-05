import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const ApiUrl = environment.API_URL;
    console.log(`app url from app ${ApiUrl}`);
    // if(!localStorage.getItem('loggerType')){
    //   localStorage.setItem('loggerType','console');
    // }
  }
  title = 'angular-review2';
}
