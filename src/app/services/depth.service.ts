import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepthService {
  public actualStarters: any;
  public nflDepth: any;
  public nbaDepth: any;
  public nhlDepth: any;

  constructor() {
    this.actualStarters = {
      // '122': {
      //   firstName: 'Lance',
      //   lastName: 'McCullers Jr.',
      //   id: 10487,
      //   status: 'SET',
      //   gdate: 'Mon Oct 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
      //   abbreviation: 'HOU'
      // },
      // '115': {
      //   firstName: 'John',
      //   lastName: 'Curtiss',
      //   id: 13338,
      //   status: 'SET',
      //   gdate: 'Thu Oct 15 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
      //   abbreviation: 'TB'
      // },
      // '137': {
      //   firstName: 'Clayton',
      //   lastName: 'Kershaw',
      //   id: 10573,
      //   status: 'SET',
      //   gdate: 'Tue Oct 20 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
      //   abbreviation: 'LAD'
      // }
      // id: 22220,
      // firstName: "Luis",
      // lastName: "Garcia",
      // HOU actual starter
         
    }

    this.nflDepth = {
      '54': [
        {
          'gdate': 8,
          // 'Offense-WR-1' : {
          //   firstName: 'DeVonta',
          //   lastName: 'Smith',
          //   id: 30438,
          //   status: 'Starter',
          //   abbreviation: 'PHI',
          //   position: 'WR'
          // },
          'Offense-WR-2' : {
            firstName: 'Boston',
            lastName: 'Scott',
            id: 14716,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'RB'
          },
          'Offense-RB-1' : {
            firstName: 'Kenneth',
            lastName: 'Gainwell',
            id: 30597,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'RB'
          },
         
      }
    ],
    '72': [
      {
        'gdate': 9,
        // 'Offense-TE-1' : {
        //   firstName: 'Noah',
        //   lastName: 'Fant',
        //   id: 16705,
        //   status: 'Starter',
        //   abbreviation: 'DEN',
        //   position: 'TE'
        // },
        'Offense-WR-1' : {
          firstName: 'Jerry',
          lastName: 'Jeudy',
          id: 18594,
          status: 'Starter',
          abbreviation: 'DEN',
          position: 'WR'
        },
      }
    ],
    '50': [
      {
        'gdate': 6,
       
        'Offense-WR-1' : {
          firstName: 'Jakobi',
          lastName: 'Meyers',
          id: 16101,
          status: 'Starter',
          abbreviation: 'NE',
          position: 'WR'
        },
      }
    ],
    '53': [
      {
        'gdate': 11,
       
        // 'Offense-TE-1' : {
        //   firstName: 'Evan',
        //   lastName: 'Engram',
        //   id: 13094,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'TE'
        // },
        'Offense-WR-2' : {
          firstName: 'Kadarius',
          lastName: 'Toney',
          id: 30447,
          status: 'Starter',
          abbreviation: 'NYG',
          position: 'WR'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'Dante',
        //   lastName: 'Pettis',
        //   id: 14728,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Sterling',
        //   lastName: 'Shepard',
        //   id: 9960,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'WR'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Wayne',
        //   lastName: 'Gallman',
        //   id: 13095,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'RB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Devonte',
        //   lastName: 'Booker',
        //   id: 9849,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'RB'
        // },
        // 'Offense-QB-1' : {
        //   firstName: 'Mike',
        //   lastName: 'Glennon',
        //   id: 8548,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'QB'
        // },
        
      }
    ],
    '74': [
      {
        'gdate': 12,
        // 'Offense-TE-1' : {
        //   firstName: 'Darren',
        //   lastName: 'Waller',
        //   id: 6133,
        //   status: 'Starter',
        //   abbreviation: 'TE',
        //   position: 'TE'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Kenyan',
        //   lastName: 'Drake',
        //   id: 9694,
        //   status: 'Starter',
        //   abbreviation: 'LV',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Henry',
        //   lastName: 'Ruggs',
        //   id: 18624,
        //   status: 'Starter',
        //   abbreviation: 'LV',
        //   position: 'WR'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Hunter',
        //   lastName: 'Renfrow',
        //   id: 16623,
        //   status: 'Starter',
        //   abbreviation: 'LV',
        //   position: 'WR'
        // },
        // 'Offense-WR-1' : {
        //   firstName: '',
        //   lastName: 'Edwards',
        //   id: 18627,
        //   status: 'Starter',
        //   abbreviation: 'LV',
        //   position: 'WR'
        // },
        'Offense-QB-1' : {
          firstName: 'Dareck',
          lastName: 'Carr',
          id: 7916,
          status: 'Starter',
          abbreviation: 'LV',
          position: 'QB'
        },
      }
    ],
    '78': [
      {
        'gdate': 19,
        'Defense-DE-1' : {
          firstName: 'Kerry',
          lastName: 'Hyder',
          id: 6866,
          status: 'Starter',
          abbreviation: 'SF',
          position: 'DE'
        },
        'Defense-CB-1' : {
          firstName: 'Emmanuel',
          lastName: 'Moseley',
          id: 15377,
          status: 'Starter',
          abbreviation: 'SF',
          position: 'DB'
        },
        'Defense-LB-1' : {
          firstName: 'Fred',
          lastName: 'Warner',
          id: 14986,
          status: 'Starter',
          abbreviation: 'SF',
          position: 'LB'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'Richie',
        //   lastName: 'James Jr.',
        //   id: 14729,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'WR'
        // },
    }
  ],
  '79': [
    {
      'gdate': 10,
      
      // 'Offense-RB-1' : {
      //   firstName: 'DeeJay',
      //   lastName: 'Dallas',
      //   id: 19016,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'RB'
      // },
       
      // 'Offense-RB-1' : {
      //   firstName: 'Alex',
      //   lastName: 'Collins',
      //   id: 10014,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'RB'
      // },
      // 'Offense-WR-2' : {
      //   firstName: 'DK',
      //   lastName: 'Metcalf',
      //   id: 16123,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'WR'
      // },
      'Offense-QB-1' : {
        firstName: 'Russell',
        lastName: 'Wilson',
        id: 8283,
        status: 'Starter',
        abbreviation: 'SEA',
        position: 'QB'
      },
      // 'Offense-TE-1' : {
      //   firstName: 'Will',
      //   lastName: 'Dissly',
      //   id: 14731,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'TE'
      // },
      
      }
    ],
    '76': [
      {
        'gdate': 10,
        // 'Offense-TE-1' : {
        //   firstName: 'Zach',
        //   lastName: 'Ertz',
        //   id: 8032,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'TE'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Rondale',
        //   lastName: 'Moore',
        //   id: 30931,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'WR'
        // },
        //  'Offense-TE-1' : {
        //   firstName: 'James',
        //   lastName: 'Connor',
        //   id: 13188,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'RB'
        // },
        'Offense-WR-1' : {
          firstName: 'Christian',
          lastName: 'Kirk',
          id: 14654,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'WR'
        },
        'Offense-QB-1' : {
          firstName: 'Colt',
          lastName: 'McCoy',
          id: 8733,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'QB'
        },
        
      }
    ],
    '55': [
      {
        'gdate': 12,
        
        // 'Offense-RB-1' : {
        //   firstName: 'Antonio',
        //   lastName: 'Gibson',
        //   id: 18688,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Terry',
        //   lastName: 'McLaurin',
        //   id: 16490,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'WR'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'JD',
        //   lastName: 'McKissic',
        //   id: 9743,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'RB'
        // },
        'Offense-WR-2' : {
          firstName: 'Adam',
          lastName: 'Humphries',
          id: 8565,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'WR'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'Ricky',
        //   lastName: 'Seals-Jones',
        //   id: 12705,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'TE'
        // },
        // 'Offense-QB-1' : {
        //   firstName: 'Taylor',
        //   lastName: 'Heinicke',
        //   id: 7459,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'QB'
        // },
        
      }
    ],
    '52': [
      {
        'gdate': 12,
      
        // 'Offense-QB-1' : {
        //   firstName: 'Garett',
        //   lastName: 'Gilbert',
        //   id: 12800,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'QB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Tony',
        //   lastName: 'Pollard',
        //   id: 16589,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Amari',
        //   lastName: 'Cooper',
        //   id: 7929,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'WR'
        // },
        'Offense-WR-1' : {
          firstName: 'Michael',
          lastName: 'Gallup',
          id: 14677,
          status: 'Starter',
          abbreviation: 'DAL',
          position: 'WR'
        },
        // 'Offense-WR-2' : {
        //   firstName: 'CeeDee',
        //   lastName: 'Lamb',
        //   id: 18588,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'WR'
        // },
        'Offense-WR-2' : {
          firstName: 'Ced',
          lastName: 'Wilson',
          id: 14678,
          status: 'Starter',
          abbreviation: 'DAL',
          position: 'WR'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'Dalton',
        //   lastName: 'Schultz',
        //   id: 14679,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'TE'
        // },
          
      }
    ],
    '51': [
      {
        'gdate': 11,
        
        // 'Offense-RB-1' : {
        //   firstName: 'Michael',
        //   lastName: 'Carter',
        //   id: 30122,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'RB'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Elijah',
        //   lastName: 'Moore',
        //   id: 30817,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'WR'
        // },
        'Offense-TE-1' : {
          firstName: 'Jamison',
          lastName: 'Crowder',
          id: 8744,
          status: 'Starter',
          abbreviation: 'NYJ',
          position: 'WR'
        },
        // 'Offense-QB-1' : {
        //   firstName: 'Mike',
        //   lastName: 'White',
        //   id: 14675,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'QB'
        // },
      }
    ],
    '69': [
      {
        'gdate': 6,
        
        // 'Offense-TE-1' : {
        //   firstName: 'Tommy',
        //   lastName: 'Tremble',
        //   id: 30978,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'TE'
        // },
        'Offense-RB-1' : {
          firstName: 'Chuba',
          lastName: 'Hubbard',
          id: 30208,
          status: 'Starter',
          abbreviation: 'CAR',
          position: 'RB'
        },
        // 'Offense-WR-2' : {
        //   firstName: 'DJ',
        //   lastName: 'Moore',
        //   id:  14515,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'WR'
        // }, 
        // 'Offense-WR-2' : {
        //   firstName: 'Robby',
        //   lastName: 'Anderson',
        //   id:  9961,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'WR'
        // }, 
        //  'Offense-TE-1' : {
        //   firstName: 'Ian',
        //   lastName: 'Thomas',
        //   id: 14664,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'TE'
        // },
      }
    ],
    '70': [
      {
        'gdate': 12,
        
        'Offense-TE-1' : {
          firstName: 'Lil',
          lastName: 'Humphrey',
          id: 16306,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'WR'
         },
        // 'Offense-QB-1' : {
        //   firstName: 'Jameis',
        //   lastName: 'Winston',
        //   id: 8550,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'QB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Alvin',
        //   lastName: 'Kamara',
        //   id: 13255,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'RB'
        // },
        // 'Offense-WR-1' : {
        //   firstName: '',
        //   lastName: 'Hill',
        //   id: 12975,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'QB'
        // },
        'Offense-WR-2' : {
          firstName: 'TreQuon',
          lastName: 'Smith',
          id: 14717,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'WR'
        },
        'Offense-WR-1' : {
          firstName: 'Marquez',
          lastName: 'Callaway',
          id: 19043,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'WR'
        },
      }
    ],
    '48': [
      {
        'gdate': 5,
        // 'Offense-TE-1' : {
        //   firstName: 'Stefon',
        //   lastName: 'Diggs',
        //   id: 1,
        //   status: 'Starter',
        //   abbreviation: 'BUF',
        //   position: 'n'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Devin',
        //   lastName: 'Singletary',
        //   id: 16040,
        //   status: 'Starter',
        //   abbreviation: 'BUF',
        //   position: 'RB'
        // },
        'Offense-WR-2' : {
          firstName: 'Emmanuel',
          lastName: 'Sanders',
          id: 6756,
          status: 'Starter',
          abbreviation: 'BUF',
          position: 'WR'
        },
      }
    ],
    '62': [
      {
        'gdate': 11,
        // 'Offense-RB-1' : {
        //   firstName: 'Aaron',
        //   lastName: 'Jones',
        //   id: 12978,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'RB'
        // }, 
        // 'Offense-TE-1' : {
        //   firstName: 'Robert',
        //   lastName: 'Tonyan',
        //   id: 12956,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'TE'
        // }, 
        'Offense-TE-1' : {
          firstName: 'Josiah',
          lastName: 'Deguara',
          id: 18605,
          status: 'Starter',
          abbreviation: 'GB',
          position: 'TE'
        }, 
        'Offense-WR-1' : {
          firstName: '',
          lastName: 'Valdes',
          id: 14688,
          status: 'Starter',
          abbreviation: 'GB',
          position: 'WR'
        }, 
        // 'Offense-WR-2' : {
        //   firstName: 'Randall',
        //   lastName: 'Cobb',
        //   id: 6926,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'WR'
        // }, 
        // 'Offense-WR-2' : {
        //   firstName: 'Davante',
        //   lastName: 'Adams',
        //   id: 6924,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'WR'
        // }, 
        // 'Offense-QB-1' : {
        //   firstName: '',
        //   lastName: 'Love',
        //   id: 18607,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'QB'
        // }, 
      }
    ],
    '64': [
      {
        'gdate': 9,
  
        // 'Offense-WR-2' : {
        //   firstName: 'Anthony',
        //   lastName: 'Miller',
        //   id: 14665,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Nico',
        //   lastName: 'Collins',
        //   id: 30242,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'WR'
        // },
        'Offense-TE-1' : {
          firstName: 'Jordan',
          lastName: 'Akins',
          id: 14693,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'TE'
        },
      }
    ],
    '58': [
      {
        'gdate': 10,
     
        // 'Offense-WR-1' : {
        //   firstName: 'Rashard',
        //   lastName: 'Higgins',
        //   id: 9823,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: '',
        //   lastName: 'Peoples-Jones',
        //   id: 18771,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'WR'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Kareem',
        //   lastName: 'Hunt',
        //   id: 13330,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'RB'
        // },
        'Offense-RB-1' : {
          firstName: 'DeErnest',
          lastName: 'Johnson',
          id: 16858,
          status: 'Starter',
          abbreviation: 'CLE',
          position: 'RB'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'David',
        //   lastName: 'Njoku',
        //   id: 12875,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'TE'
        // },
         // 'Offense-TE-1' : {
        //   firstName: 'Austin',
        //   lastName: 'Hooper',
        //   id: 9741,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'TE'
        // },
      }
    ],
    '57': [
      {
        'gdate': 11,
        
        'Offense-RB-1' : {
          firstName: 'Joe',
          lastName: 'Mixon',
          id: 12843,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'RB'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'Tee',
        //   lastName: 'Higgins',
        //   id: 18578,
        //   status: 'Starter',
        //   abbreviation: 'CIN',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Tyler',
        //   lastName: 'Boyd',
        //   id: 9797,
        //   status: 'Starter',
        //   abbreviation: 'CIN',
        //   position: 'WR'
        // },
      }
    ],
    '61': [
      {
        'gdate': 11,
   
       
        'Offense-RB-1' : {
          firstName: 'D Andre',
          lastName: 'Swift',
          id: 18603,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'RB'
        },
        'Offense-WR-1' : {
          firstName: '',
          lastName: 'St Brown',
          id: 30625,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'WR'
        },
        // 'Offense-WR-2' : {
        //   firstName: '',
        //   lastName: 'Igwebuike',
        //   id: 15401,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'T.J.',
        //   lastName: 'Hockenson',
        //   id: 18603,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'TE'
        // },
        //  'Offense-RB-1' : {
        //   firstName: 'Adrian',
        //   lastName: 'Peterson',
        //   id: 7466,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Jamaal',
        //   lastName: 'Williams',
        //   id: 12999,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
        
      }
    ],
    '68': [
      {
        'gdate': 11,

        // 'Offense-WR-2' : {
        //   firstName: 'Cordarrelle',
        //   lastName: 'Patterson',
        //   id: 7477,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'RB'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Olamide',
        //   lastName: 'Zaccheaus',
        //   id: 16333,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'RB'
        // },
        'Offense-TE-1' : {
          firstName: 'Kyle',
          lastName: 'Pitts',
          id: 30432,
          status: 'Starter',
          abbreviation: 'ATL',
          position: 'TE'
        },
      // 'Offense-WR-2' : {
        //   firstName: 'Russell',
        //   lastName: 'Gage',
        //   id: 14658,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'WR'
        // },
        
      }
    ],
    '60': [
      {
        'gdate': 12,
        // 'Offense-QB-1' : {
        //   firstName: 'Justin',
        //   lastName: 'Fields',
        //   id: 30439,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'QB'
        // },
        'Offense-QB-1' : {
          firstName: 'Andy',
          lastName: 'Dalton',
          id: 6464,
          status: 'Starter',
          abbreviation: 'CHI',
          position: 'QB'
        },
        'Offense-RB-1' : {
          firstName: 'David',
          lastName: 'Montgomery',
          id: 16039,
          status: 'Starter',
          abbreviation: 'CHI',
          position: 'RB'
        }, 
        // 'Offense-RB-1' : {
        //   firstName: 'Kahlil',
        //   lastName: 'Herbert',
        //   id: 30593,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Allen',
        //   lastName: 'Robinson',
        //   id: 7198,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'WR'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Damien',
        //   lastName: 'Williams',
        //   id: 7373,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Darnell',
        //   lastName: 'Mooney',
        //   id: 18757,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Cole',
        //   lastName: 'Kmet',
        //   id: 18576,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'TE'
        // },
        
        
      }
    ],
    '66': [
      {
        'gdate': 9,
        
        // 'Offense-WR-1' : {
        //   firstName: 'Laviska',
        //   lastName: 'Shenault',
        //   id: 18619,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Dan',
        //   lastName: 'Arnold',
        //   id: 12648,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'TE'
        // },
        //  'Offense-TE-1' : {
        //   firstName: 'Luke',
        //   lastName: 'Farrell',
        //   id: 30703,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'TE'
        // },
        'Offense-RB-1' : {
          firstName: 'Carlos',
          lastName: 'Hyde',
          id: 8381,
          status: 'Starter',
          abbreviation: 'JAX',
          position: 'RB'
        },
        'Offense-WR-1' : {
          firstName: 'Marvin',
          lastName: 'Jones',
          id: 6479,
          status: 'Starter',
          abbreviation: 'JAX',
          position: 'WR'
        },
        
      }
    ],
    '75': [
      {
        'gdate':11,
   
        // 'Offense-RB-1' : {
        //   firstName: 'Joshua',
        //   lastName: 'Kelley',
        //   id: 18882,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'RB'
        // },
        'Offense-WR-2' : {
          firstName: 'Mike',
          lastName: 'Williams',
          id: 13398,
          status: 'Starter',
          abbreviation: 'LAC',
          position: 'WR'
        },
        'Offense-TE-1' : {
          firstName: 'Jared',
          lastName: 'Cook',
          id: 8487,
          status: 'Starter',
          abbreviation: 'LAC',
          position: 'TE'
        },
        
      }
    ],
    '59': [
      {
        'gdate': 9,
     
        // 'Offense-WR-2' : {
        //   firstName: 'Chase',
        //   lastName: 'Claypool',
        //   id: 18672,
        //   status: 'Starter',
        //   abbreviation: 'PIT',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Pat',
        //   lastName: 'Freiermuth',
        //   id: 30693,
        //   status: 'Starter',
        //   abbreviation: 'PIT',
        //   position: 'TE'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'JuJu',
        //   lastName: 'Smith-Schus',
        //   id: 13203,
        //   status: 'Starter',
        //   abbreviation: 'PIT',
        //   position: 'WR'
        // },
         'Offense-WR-2' : {
          firstName: '',
          lastName: 'Johnson',
          id: 16843,
          status: 'Starter',
          abbreviation: 'PIT',
          position: 'WR'
        },
      }
    ],
    '56': [
      {
        'gdate': 11,
       
        'Offense-TE-1' : {
          firstName: 'Mark',
          lastName: 'Andrews',
          id: 14486,
          status: 'Starter',
          abbreviation: 'BAL',
          position: 'TE'
        },
        // 'Offense-QB-1' : {
        //   firstName: 'Tyler',
        //   lastName: 'Huntley',
        //   id: 18726,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'QB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Marquise',
        //   lastName: 'Brown',
        //   id: 16931,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Devin',
        //   lastName: 'Duvernay',
        //   id: 18562,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'WR'
        // },
        // 'Offense-QB-1' : {
        //   firstName: 'Lamar',
        //   lastName: 'Jackson',
        //   id: 14523,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'QB'
        // },
        
        
      }
    ],
    '63': [
      {
        'gdate': 1,
         
        'Offense-RB-1' : {
          firstName: 'Dalvin',
          lastName: 'Cook',
          id: 13132,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'RB'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'Justin',
        //   lastName: 'Jefferson',
        //   id: 18648,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'WR'
        // },
        'Offense-TE-1' : {
          firstName: 'Adam',
          lastName: 'Thielen',
          id: 7478,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'WR'
        },
        // 'Defense-DE-1' : {
        //   firstName: 'Eric',
        //   lastName: 'Kendricks',
        //   id: 7523,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'MLB'
        // },
        // 'Defense-CB-1' : {
        //   firstName: 'Eric',
        //   lastName: 'Wilson',
        //   id: 13156,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'LB'
        // },
        
        
      }
    ],
    '49': [
      {
        'gdate': 10,
   
        // 'Offense-WR-2' : {
        //   firstName: 'Jaylen',
        //   lastName: 'Waddle',
        //   id: 30434,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //     firstName: 'Mack',
        //     lastName: 'Hollins',
        //     id: 13280,
        //     status: 'Starter',
        //     abbreviation: 'MIA',
        //     position: 'WR'
        //   },
        'Offense-WR-1' : {
            firstName: 'Albert',
            lastName: 'Wilson',
            id: 7296,
            status: 'Starter',
            abbreviation: 'MIA',
            position: 'WR'
          },
        // 'Offense-TE-1' : {
        //   firstName: 'Mike',
        //   lastName: 'Gesicki',
        //   id: 14706,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'TE'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Myles',
        //   lastName: 'Gaskin',
        //   id: 16074,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'RB'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'DeVante',
        //   lastName: 'Parker',
        //   id: 7384,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'WR'
        // },
      }
    ],
    '65': [
      {
        'gdate': 9,
      
        // 'Offense-TE-1' : {
        //   firstName: 'Mo',
        //   lastName: 'Alie-Cox',
        //   id: 12672,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'TE'
        // },
        'Offense-WR-2' : {
          firstName: 'Johnny',
          lastName: 'Taylor',
          id: 18615,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'RB'
        },
        // 'Offense-WR-2' : {
        //   firstName: 'Zach',
        //   lastName: 'Pascal',
        //   id: 13173,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'TY',
        //   lastName: 'Hilton',
        //   id: 7105,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'WR'
        // },
        
      }
    ],
    '67': [
      {
        'gdate': 12,
        // 'Offense-WR-2' : {
        //   firstName: 'A.J.',
        //   lastName: 'Brown',
        //   id: 16786,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'WR'
        // },
        'Offense-WR-2' : {
          firstName: 'Nick',
          lastName: 'Westbrook',
          id: 23257,
          status: 'Starter',
          abbreviation: 'TEN',
          position: 'WR'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'Julio',
        //   lastName: 'Jones',
        //   id: 6038,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Geoff',
        //   lastName: 'Swaim',
        //   id: 6671,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'TE'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Marcus',
        //   lastName: 'Johnson',
        //   id: 13281,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'WR'
        // },
        'Offense-TE-1' : {
          firstName: 'Anthony',
          lastName: 'Firkser',
          id: 15274,
          status: 'Starter',
          abbreviation: 'TEN',
          position: 'TE'
        },
        'Offense-RB-1' : {
          firstName: 'D',
          lastName: 'Foreman',
          id: 13009,
          status: 'Starter',
          abbreviation: 'TEN',
          position: 'RB'
        },
        // 'Defense-CB-1' : {
        //   firstName: 'Jayon',
        //   lastName: 'Brown',
        //   id: 13511,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'ILB'
        // },
        
        
      }
    ],
    '71': [
      {
        'gdate': 7,
       
        // 'Offense-RB-1' : {
        //   firstName: 'Leonard',
        //   lastName: 'Fournette',
        //   id: 12606,
        //   status: 'Starter',
        //   abbreviation: 'TB',
        //   position: 'RB'
        // },  
        // 'Offense-TE-1' : {
        //   firstName: 'Cameron',
        //   lastName: 'Brate',
        //   id: 8570,
        //   status: 'Starter',
        //   abbreviation: 'TB',
        //   position: 'TE'
        // }, 
        // 'Offense-TE-1' : {
        //   firstName: 'Antonio',
        //   lastName: 'Brown',
        //   id: 8109,
        //   status: 'Starter',
        //   abbreviation: 'TB',
        //   position: 'WR'
        // },
        'Offense-WR-2' : {
          firstName: 'Mike',
          lastName: 'Evans',
          id: 8562,
          status: 'Starter',
          abbreviation: 'TB',
          position: 'WR'
        }, 
      }
    ],
    '73': [
      {
        'gdate': 9,
       
        // 'Offense-WR-1' : {
        //   firstName: 'Tyreek',
        //   lastName: 'Hill',
        //   id: 9910,
        //   status: 'Starter',
        //   abbreviation: 'KC',
        //   position: 'WR'
        // }, 
        'Offense-RB-1' : {
          firstName: 'Darrel',
          lastName: 'Williams',
          id: 14905,
          status: 'Starter',
          abbreviation: 'KC',
          position: 'RB'
        }, 
      }
    ],
    '77': [
      {
        'gdate': 10,
        // 'Offense-QB-1' : {
        //   firstName: 'Jared',
        //   lastName: 'Goff',
        //   id: 9919,
        //   status: 'Starter',
        //   abbreviation: 'LA',
        //   position: 'QB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Robert',
        //   lastName: 'Woods',
        //   id: 6225,
        //   status: 'Starter',
        //   abbreviation: 'LA',
        //   position: 'WR'
        // },
        'Offense-WR-2' : {
          firstName: 'Odell',
          lastName: 'Beckham Jr.',
          id: 7746,
          status: 'Starter',
          abbreviation: 'LA',
          position: 'WR'
        },
          
      }
    ],
         
    }

    this.nbaDepth = {
        '100': [
          {
            'gdate': 'Sun Dec 27 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
            'Starter1' : {
              firstName: 'Anthony',
              lastName: 'Edwards',
              id: 27638,
              status: 'Starter',
              abbreviation: 'MIN',
              position: 'SG'
            },
            'Starter2' : {
              firstName: 'DeAngelo',
              lastName: 'Russell',
              id: 9285,
              status: 'Starter',
              abbreviation: 'MIN',
              position: 'SG'
            },
        }
      ],
      '94': [
        {
          'gdate': 'Wed Feb 3 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
          'Starter5' : {
            firstName: 'Ish',
            lastName: 'Smith',
            id: 9425,
            status: 'Starter',
            abbreviation: 'WAS',
            position: 'PG'
          },
      }
    ],

    }

  this.nhlDepth = {
      '100': [
        {
          'gdate': 'Sun Dec 27 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
          'DefensePair1-R' : {
            firstName: 'Anthony',
            lastName: 'Edwards',
            id: 27638,
            status: 'Starter',
            abbreviation: 'MIN',
            position: 'SG'
          },
          'ForwardLine1-LW' : {
            firstName: 'DeAngelo',
            lastName: 'Russell',
            id: 9285,
            status: 'Starter',
            abbreviation: 'MIN',
            position: 'SG'
          },
      }
    ],
    '94': [
      {
        'gdate': 'Wed Feb 3 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        'Starter5' : {
          firstName: 'Ish',
          lastName: 'Smith',
          id: 9425,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'PG'
        },
    }
  ],

  }
}
  
  public getActualStarters() {
    return this.actualStarters;
  }
  public getNFLDepth() {
    return this.nflDepth;
  }
  public getNBADepth() {
    return this.nbaDepth;
  }
  public getNHLDepth() {
    return this.nhlDepth;
  }
}
