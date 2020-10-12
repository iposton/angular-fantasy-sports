import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepthService {
  public actualStarters: any;

  constructor() {
    this.actualStarters = {
      '122': {
        firstName: 'Lance',
        lastName: 'McCullers Jr.',
        id: 10487,
        status: 'SET',
        gdate: 'Mon Oct 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      },
      '125': {
        firstName: 'Chris',
        lastName: 'Bassitt',
        id: 10738,
        status: 'SET',
        gdate: 'Mon Oct 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      },
      '114': {
        firstName: 'Garett',
        lastName: 'Cole',
        id: 10792,
        status: 'SET',
        gdate: 'Mon Oct 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      },
      // '115': {
      //   firstName: 'Blake',
      //   lastName: 'Snell',
      //   id: 10956,
      //   status: 'SET',
      //   gdate: 'Mon Oct 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      // },
      '139': {
        firstName: 'Mike',
        lastName: 'Clevinger',
        id: 10365,
        status: 'SET',
        gdate: 'Tue Oct 06 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      },
      '115': {
        firstName: 'Charlie',
        lastName: 'Morton',
        id: 11459,
        status: 'SET',
        gdate: 'Mon Oct 12 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      }
      
    }
  }
  
  public getActualStarters() {
    return this.actualStarters;
  }
}
