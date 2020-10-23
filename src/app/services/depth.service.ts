import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepthService {
  public actualStarters: any;
  public nflDepth: any;

  constructor() {
    this.actualStarters = {
      '122': {
        firstName: 'Lance',
        lastName: 'McCullers Jr.',
        id: 10487,
        status: 'SET',
        gdate: 'Mon Oct 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        abbreviation: 'HOU'
      },
      '115': {
        firstName: 'John',
        lastName: 'Curtiss',
        id: 13338,
        status: 'SET',
        gdate: 'Thu Oct 15 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        abbreviation: 'TB'
      },
      '137': {
        firstName: 'Clayton',
        lastName: 'Kershaw',
        id: 10573,
        status: 'SET',
        gdate: 'Tue Oct 20 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        abbreviation: 'LAD'
      }
         
    }

    this.nflDepth = {
      '54': [
        {
          'gdate': 'Thu Oct 22 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
          'Offense-WR-1' : {
            firstName: 'Travis',
            lastName: 'Fulgham',
            id: 16422,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'WR'
          },
          'Offense-RB-1' : {
            firstName: 'Boston',
            lastName: 'Scott',
            id: 14716,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'RB'
          },
      }
    ],
    '72': [
      {
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        'Defense-CB-1' : {
          firstName: 'Michael',
          lastName: 'Ojemudia',
          id: 18595,
          status: 'Starter',
          abbreviation: 'DEN',
          position: 'CB'
        },
      }
    ],
    '50': [
      {
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        'Defense-CB-1' : {
          firstName: 'Ja Whaun',
          lastName: 'Bentley',
          id: 15000,
          status: 'Starter',
          abbreviation: 'NE',
          position: 'LB'
        },
      }
    ]
         
    }
  }
  
  public getActualStarters() {
    return this.actualStarters;
  }
  public getNFLDepth() {
    return this.nflDepth;
  }
}
