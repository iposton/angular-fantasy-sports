import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  pure: false
})
export class SortByPipe implements PipeTransform {

  transform(array: any[], field1: string, field2: string, order: string): any[] {
    array.sort((a: any, b: any) => {
     if (order === 'ASC' && field1 != 'draftKit') {
        if (a['stats'][field1][field2] <= b['stats'][field1][field2]) {
          return -1;
        } else if (a['stats'][field1][field2] >= b['stats'][field1][field2]) {
          return 1;
        } else {
          return 0;
        }
     } else if (order === 'DESC' && field1 != 'draftKit') {
        if (a['stats'][field1][field2] >= b['stats'][field1][field2]) {
          return -1;
        } else if (a['stats'][field1][field2] <= b['stats'][field1][field2]) {
          return 1;
        } else {
          return 0;
        }
     } else if (field1 === 'draftKit') {
       
      if (a['team'][field2] >= b['team'][field2]) {
        return -1;
      } else if (a['team'][field2] <= b['team'][field2]) {
        return 1;
      } else {
        return 0;
      }
   }
       
    });
    return array;
  }
}
