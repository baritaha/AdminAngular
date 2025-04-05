import { Component } from '@angular/core';

@Component({
  selector: 'app-header-layout',
  standalone: false,
  templateUrl: './header-layout.component.html',
  styleUrl: './header-layout.component.scss'
})
export class HeaderLayoutComponent {
logout():void{
  localStorage.removeItem('email');
  localStorage.removeItem('id');
  localStorage.removeItem('name');
  localStorage.removeItem('role');
}
welcomeName:any=localStorage.getItem('name');

}
