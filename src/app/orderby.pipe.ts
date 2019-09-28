import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {
 

transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] <= b[field] || 
        a.offensePlayers[0].playerObj[field] <= b.offensePlayers[0].playerObj[field]) {
        return -1;
      } else if (a[field] >= b[field] || 
        a.offensePlayers[0].playerObj[field] >= b.offensePlayers[0].playerObj[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}