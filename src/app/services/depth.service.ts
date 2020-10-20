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
      // '115': {
      //   firstName: 'Blake',
      //   lastName: 'Snell',
      //   id: 10956,
      //   status: 'SET',
      //   gdate: 'Mon Oct 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      // },
      // '115': {
      //   firstName: 'Charlie',
      //   lastName: 'Morton',
      //   id: 11459,
      //   status: 'SET',
      //   gdate: 'Mon Oct 12 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      // },
      '115': {
        firstName: 'John',
        lastName: 'Curtiss',
        id: 13338,
        status: 'SET',
        gdate: 'Thu Oct 15 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      },
      // '137': {
      //   firstName: 'Tony',
      //   lastName: 'Gonsolin',
      //   id: 15634,
      //   status: 'SET',
      //   gdate: 'Tue Oct 13 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      // } 
      // '137': {
      //   firstName: 'Dustin',
      //   lastName: 'May',
      //   id: 14338,
      //   status: 'SET',
      //   gdate: 'Sun Oct 18 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      // },
      '137': {
        firstName: 'Clayton',
        lastName: 'Kershaw',
        id: 10573,
        status: 'SET',
        gdate: 'Tue Oct 20 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      }
         
    }
  }
  
  public getActualStarters() {
    return this.actualStarters;
  }
}
