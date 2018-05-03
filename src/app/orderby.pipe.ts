import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {
 

transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (parseInt(a[field]) <= parseInt(b[field])) {
        return -1;
      } else if (parseInt(a[field]) >= parseInt(b[field])) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}