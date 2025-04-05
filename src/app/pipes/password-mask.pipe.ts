import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordMask',
  standalone: false
})
export class PasswordMaskPipe implements PipeTransform {

  transform(value: string, maskChar: string = '*',num:number): string {
    return value ? value.slice(value.length-num)+ maskChar.repeat(value.length-num) : '';
  }

}
