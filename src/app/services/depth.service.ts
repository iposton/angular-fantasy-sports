import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepthService {
  public actualStarters: any;

  constructor() {
    this.actualStarters = {
      '139': {
        firstName: 'Craig',
        lastName: 'Stammen',
        id: 12457,
        status: 'SET',
        gdate: 'Thu Oct 02 2020 00:00:00 GMT-0700 (Pacific Daylight Time)'
      }
    }
  }
  
  public getActualStarters() {
    return this.actualStarters;
  }
}
