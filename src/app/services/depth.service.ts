import { Injectable } from '@angular/core'
let nflImageRoot = 'https://static.www.nfl.com/image/private/t_player_profile_landscape_2x/f_auto/league/'

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
          'gdate': 11,
          
          // 'Offense-TE-1' : {
          //   firstName: 'M',
          //   lastName: 'Sanders',
          //   id: 16035,
          //   status: 'Starter',
          //   abbreviation: 'PHI',
          //   position: 'RB'
          // },

        'Offense-TE-1' : {
          firstName: 'A.J.',
          lastName: 'Brown',
          id: 16786,
          status: 'Starter',
          abbreviation: 'PHI',
          position: 'WR',
          image: nflImageRoot+"sb8stxfvnkedmhs6c1fx"
        },
        // 'Offense-TE-1' : {
        //     firstName: 'DeVonta',
        //     lastName: 'Smith',
        //     id: 30438,
        //     status: 'Starter',
        //     abbreviation: 'PHI',
        //     position: 'WR'
        //   },
          // 'Offense-TE-1' : {
          //   firstName: 'Dallas',
          //   lastName: 'Goedert',
          //   id: 14725,
          //   status: 'Starter',
          //   abbreviation: 'PHI',
          //   position: 'TE'
          // },
          // 'Offense-RB-1' : {
          //   firstName: 'Boston',
          //   lastName: 'Scott',
          //   id: 14716,
          //   status: 'Starter',
          //   abbreviation: 'PHI',
          //   position: 'RB'
          // },
          // 'Offense-WR-2' : {
          //   firstName: 'Kenneth',
          //   lastName: 'Gainwell',
          //   id: 30597,
          //   status: 'Starter',
          //   abbreviation: 'PHI',
          //   position: 'RB'
          // },
         
      }
    ],
    '72': [
      {
        'gdate': 11,

        
        // 'Offense-WR-1' : {
        //   firstName: 'E',
        //   lastName: 'Tomlinson',
        //   id: 8034,
        //   status: 'Starter',
        //   abbreviation: 'DEN',
        //   position: 'TE'
        // },

        // 'Offense-WR-2' : {
        //   firstName: 'Latavius',
        //   lastName: 'Murray',
        //   id: 7924,
        //   status: 'Starter',
        //   abbreviation: 'DEN',
        //   position: 'RB'
        // },

        
        'Offense-TE-1' : {
          firstName: 'Greg',
          lastName: 'Dulcich',
          id: 43340,
          status: 'Starter',
          abbreviation: 'DEN',
          position: 'TE'
        },

        // 'Offense-TE-1' : {
        //   firstName: '',
        //   lastName: 'Saubert',
        //   id: 12738,
        //   status: 'Starter',
        //   abbreviation: 'DEN',
        //   position: 'TE'
        // },
   
         'Offense-WR-2' : {
          firstName: 'Courtland',
          lastName: 'Sutton',
          id: 14682,
          status: 'Starter',
          abbreviation: 'DEN',
          position: 'WR'
        },
       
        // 'Offense-RB-1' : {
        //   firstName: '',
        //   lastName: 'Gordon',
        //   id: 8195,
        //   status: 'Starter',
        //   abbreviation: 'DEN',
        //   position: 'RB'
        // },
      }
    ],
    '50': [
      {
        'gdate': 11,

        // 'Offense-WR-2' : {
        //   firstName: 'Tyquan',
        //   lastName: 'Thornton',
        //   id: 39124,
        //   status: 'Starter',
        //   abbreviation: 'NE',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Hunter',
        //   lastName: 'Henry',
        //   id: 9999,
        //   status: 'Starter',
        //   abbreviation: 'NE',
        //   position: 'TE'
        // },
       
       

        // 'Offense-QB-1' : {
        //   firstName: 'Bailey',
        //   lastName: 'Zappe',
        //   id: 39810,
        //   status: 'Starter',
        //   abbreviation: 'NE',
        //   position: 'QB'
        // },
        
        // 'Offense-WR-2' : {
        //   firstName: 'Nelson',
        //   lastName: 'Angoler',
        //   id: 8019,
        //   status: 'Starter',
        //   abbreviation: 'NE',
        //   position: 'WR'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Rhamandre',
        //   lastName: 'Stevenson',
        //   id: 31103,
        //   status: 'Starter',
        //   abbreviation: 'NE',
        //   position: 'RB'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'DeVante',
        //   lastName: 'Parker',
        //   id: 7384,
        //   status: 'Starter',
        //   abbreviation: 'NE',
        //   position: 'WR'
        // },
        'Offense-QB-1' : {
          firstName: 'Mac',
          lastName: 'Jones',
          id: 30443,
          status: 'Starter',
          abbreviation: 'NE',
          position: 'QB'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'J',
        //   lastName: 'Smith',
        //   id: 13529,
        //   status: 'Starter',
        //   abbreviation: 'NE',
        //   position: 'TE'
        // },
        
      }
    ],
    '53': [
      {
        'gdate': 11,
       
        
        // 'Offense-TE-1' : {
        //   firstName: 'L',
        //   lastName: 'Cager',
        //   id: 23323,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'TE'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'WanDale',
        //   lastName: 'Robinson',
        //   id: 39117,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Chris',
        //   lastName: 'Myarick',
        //   id: 16079,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'TE'
        // },
      
        'Offense-WR-2' : {
          firstName: 'Richie',
          lastName: 'James',
          id: 14729,
          status: 'Starter',
          abbreviation: 'NYG',
          position: 'WR'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'Darius',
        //   lastName: 'Slayton',
        //   id: 16600,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Tyrod',
        //   lastName: 'Taylor',
        //   id: 6205,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'QB'
        // },
        //  'Offense-TE-1' : {
        //   firstName: 'Daniel',
        //   lastName: 'Bellinger',
        //   id: 43347,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'TE'
        // },
        
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
        // 'Offense-WR-1' : {
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
        'gdate': 1,

         'Offense-WR-2' : {
          firstName: 'Jakobi',
          lastName: 'Meyers',
          id: 16101,
          status: 'Starter',
          abbreviation: 'LV',
          position: 'WR'
        },

        'Offense-WR-1' : {
          firstName: 'Davante',
          lastName: 'Adams',
          id: 6924,
          status: 'Starter',
          abbreviation: 'LV',
          position: 'WR'
        }, 

        // 'Offense-TE-1' : {
        //   firstName: 'Darren',
        //   lastName: 'Waller',
        //   id: 6133,
        //   status: 'Starter',
        //   abbreviation: 'TE',
        //   position: 'TE'
        // },
      
    
        // 'Offense-WR-2' : {
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
       
       
      }
    ],
    '78': [
      {
        'gdate': 1,
        

        // 'Offense-WR-2' : {
        //   firstName: 'B',
        //   lastName: 'Aiyuk',
        //   id: 18675,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'WR'
        // },
        'Offense-RB-1' : {
          firstName: 'J',
          lastName: 'Mason',
          id: 47779,
          status: 'Starter',
          abbreviation: 'SF',
          position: 'RB'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'George',
        //   lastName: 'Kittle',
        //   id: 13457,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'TE'
        // },

        // 'Offense-TE-1' : {
        //   firstName: '',
        //   lastName: 'Kroft',
        //   id: 6487,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'TE'
        // },
        // 'Offense-QB-1' : {
        //   firstName: 'Jimmy',
        //   lastName: 'Garoppolo',
        //   id: 7551,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'QB'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Ross',
        //   lastName: 'Dwelley',
        //   id: 14778,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'TE'
        // },
        
        // 'Offense-WR-1' : {
        //   firstName: 'Richie',
        //   lastName: 'James Jr.',
        //   id: 14729,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'WR'
        // },
        
        // 'Offense-WR-1' : {
        //   firstName: 'Deebo',
        //   lastName: 'Samuel',
        //   id: 16143,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Elijah',
        //   lastName: 'Mitchell',
        //   id: 30193,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'RB'
        // },
    }
  ],
  '79': [
    {
      'gdate': 11,

      'Offense-TE-1' : {
        firstName: 'Noah',
        lastName: 'Fant',
        id: 16705,
        status: 'Starter',
        abbreviation: 'SEA',
        position: 'TE'
      },
      

      // 'Offense-RB-1' : {
      //   firstName: 'K',
      //   lastName: 'Walker',
      //   id: 39115,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'RB'
      // },

      // 'Offense-TE-1' : {
      //   firstName: 'M',
      //   lastName: 'Goodwin',
      //   id: 6216,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'WR'
      // },
      
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
      // 'Offense-QB-1' : {
      //   firstName: 'Russell',
      //   lastName: 'Wilson',
      //   id: 8283,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'QB'
      // },
      // 'Offense-WR-2' : {
      //   firstName: 'Tyler',
      //   lastName: 'Lockett',
      //   id: 8296,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'WR'
      // },
      
     
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
        'gdate': 1,
        
      //  'Offense-TE-1' : {
      //     firstName: 'K',
      //     lastName: 'Ingram',
      //     id: 44949,
      //     status: 'Starter',
      //     abbreviation: 'ARI',
      //     position: 'RB'
      //   },
        // 'Offense-WR-2' : {
        //   firstName: 'Marquise',
        //   lastName: 'Brown',
        //   id: 16931,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'WR'
        // },

         'Offense-WR-2' : {
          firstName: 'Greg',
          lastName: 'Dortch',
          id: 16185,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'WR'
        },

        'Offense-WR-1' : {
          firstName: 'M',
          lastName: 'Harrison Jr.',
          id: 133838,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'WR'
        },

        //  'Offense-RB-1' : {
        //   firstName: 'Darrel',
        //   lastName: 'Williams',
        //   id: 14905,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'RB'
        // }, 
        // 'Offense-TE-1' : {
        //   firstName: 'Zach',
        //   lastName: 'Ertz',
        //   id: 8032,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'TE'
        // },
        // 'Offense-WR-2' : {
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
     
        // 'Offense-WR-2' : {
        //   firstName: 'AJ',
        //   lastName: 'Green',
        //   id: 6477,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'WR'
        // },
        // 'Offense-QB-1' : {
        //   firstName: 'Colt',
        //   lastName: 'McCoy',
        //   id: 8733,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'QB'
        // },
        
      }
    ],
    '55': [
      {
        'gdate': 11,

        // 'Offense-TE-1' : {
        //   firstName: 'B',
        //   lastName: 'Robinson',
        //   id: 43352,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'RB'
        // },

        // 'Offense-WR-1' : {
        //   firstName: 'Curtis',
        //   lastName: 'Samuel',
        //   id: 12811,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'WR'
        // },
        
        'Offense-TE-1' : {
          firstName: 'Antonio',
          lastName: 'Gibson',
          id: 18688,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'RB'
        },
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
        // 'Offense-WR-2' : {
        //   firstName: 'Adam',
        //   lastName: 'Humphries',
        //   id: 8565,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Cam',
        //   lastName: 'Sims',
        //   id: 14852,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'WR'
        // },
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
        'gdate': 1,

        // 'Offense-WR-1' : {
        //   firstName: 'Noah',
        //   lastName: 'Brown',
        //   id: 12885,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'WR'
        // },
      
        // 'Offense-QB-1' : {
        //   firstName: 'Garett',
        //   lastName: 'Gilbert',
        //   id: 12800,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'QB'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Tony',
        //   lastName: 'Pollard',
        //   id: 16589,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'RB'
        // },
    
        // 'Offense-WR-2' : {
        //   firstName: 'Michael',
        //   lastName: 'Gallup',
        //   id: 14677,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'WR'
        // },
        'Offense-WR-2' : {
          firstName: 'Brandin',
          lastName: 'Cooks',
          id: 7656,
          status: 'Starter',
          abbreviation: 'DAL',
          position: 'WR'
        },
        'Offense-WR-1' : {
          firstName: 'CeeDee',
          lastName: 'Lamb',
          id: 18588,
          status: 'Starter',
          abbreviation: 'DAL',
          position: 'WR'
        },
        // 'Offense-WR-2' : {
        //   firstName: 'Ced',
        //   lastName: 'Wilson',
        //   id: 14678,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'WR'
        // },
     
          
      }
    ],
    '51': [
      {
        'gdate': 1,

           // 'Offense-QB-1' : {
        //   firstName: 'Aaron',
        //   lastName: 'Rogers',
        //   id: 6914,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'QB'
        // }, 

        // 'Offense-QB-1' : {
        //   firstName: 'Z',
        //   lastName: 'Wilson',
        //   id: 30430,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'QB'
        // },

        // 'Offense-RB-1' : {
        //   firstName: 'Dalvin',
        //   lastName: 'Cook',
        //   id: 13132,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'RB'
        // },

        // 'Offense-WR-2' : {
        //   firstName: 'Allen',
        //   lastName: 'Lazard',
        //   id: 14826,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'WR'
        // }, 

        // 'Offense-RB-1' : {
        //   firstName: 'Ty',
        //   lastName: 'Johnson',
        //   id: 16424,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'RB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Z',
        //   lastName: 'Knight',
        //   id: 47386,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'RB'
        // },
       
        // 'Offense-WR-2' : {
        //   firstName: 'James',
        //   lastName: 'Robinson',
        //   id: 18849,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'RB'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'G',
        //   lastName: 'Wilson',
        //   id: 39084,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Breece',
        //   lastName: 'Hall',
        //   id: 39110,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'RB'
        // },
        
        // 'Offense-WR-2' : {
        //   firstName: 'Michael',
        //   lastName: 'Carter',
        //   id: 30122,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Elijah',
        //   lastName: 'Moore',
        //   id: 30817,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'WR'
        // },
        'Offense-TE-1' : {
          firstName: 'Tyler',
          lastName: 'Conklin',
          id: 14710,
          status: 'Starter',
          abbreviation: 'NYJ',
          position: 'TE'
        },
        // 'Offense-WR-2' : {
        //   firstName: 'Corey',
        //   lastName: 'Davis',
        //   id: 12670,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'WR'
        // },
        
        // 'Offense-TE-1' : {
        //   firstName: 'Jamison',
        //   lastName: 'Crowder',
        //   id: 8744,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'WR'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Braxton',
        //   lastName: 'Berrios',
        //   id: 14713,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'WR'
        // },
       
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
        'gdate': 1,

        // 'Offense-QB-1' : {
        //   firstName: 'Andy',
        //   lastName: 'Dalton',
        //   id: 6464,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'QB'
        // },
        

        'Offense-TE-1' : {
          firstName: 'X',
          lastName: 'Legette',
          id: 133866,
          status: 'Starter',
          abbreviation: 'CAR',
          position: 'WR'
        },

        //  'Offense-WR-2' : {
        //   firstName: 'D.J.',
        //   lastName: 'Chark Jr.',
        //   id: 14701,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'RB'
        // },

   

        // 'Offense-QB-1' : {
        //   firstName: 'Baker',
        //   lastName: 'Mayfield',
        //   id: 14492,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'QB'
        // },
        
        // 'Offense-WR-2' : {
        //   firstName: 'Raheem',
        //   lastName: 'Blackshear',
        //   id: 47863,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'RB'
        // },

        // 'Offense-TE-1' : {
        //   firstName: 'T',
        //   lastName: 'Marshall',
        //   id: 30933,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'WR'
        // },


        // 'Offense-WR-2' : {
        //   firstName: 'Laviska',
        //   lastName: 'Shenault',
        //   id: 18619,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'WR'
        // },
        
        // 'Offense-TE-1' : {
        //   firstName: 'Tommy',
        //   lastName: 'Tremble',
        //   id: 30978,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'TE'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Chuba',
        //   lastName: 'Hubbard',
        //   id: 30208,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'D',
        //   lastName: 'Foreman',
        //   id: 13009,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'RB'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'DJ',
        //   lastName: 'Moore',
        //   id:  14515,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'WR'
        // }, 
        // 'Offense-TE-1' : {
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
        'gdate': 11,

        // 'Offense-TE-1' : {
        //   firstName: 'M',
        //   lastName: 'Thomas',
        //   id: 9952,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'WR'
        // },

        'Offense-QB-1' : {
          firstName: 'Dareck',
          lastName: 'Carr',
          id: 7916,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'QB'
        },

        // 'Offense-RB-1' : {
        //   firstName: 'Jamaal',
        //   lastName: 'Williams',
        //   id: 12999,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'RB'
        // },

        // 'Offense-WR-2' : {
        //   firstName: '',
        //   lastName: 'Landry',
        //   id: 7380,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'WR'
        // },

        // 'Offense-TE-1' : {
        //   firstName: 'Juwan',
        //   lastName: 'Johnson',
        //   id: 24446,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'TE'
        // },
       'Offense-WR-2' : {
          firstName: 'Rahshid',
          lastName: 'Shaheed',
          id: 55455,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'WR'
        },
      //  'Offense-WR-1' : {
      //     firstName: '',
      //     lastName: 'Trautman',
      //     id: 18657,
      //     status: 'Starter',
      //     abbreviation: 'NO',
      //     position: 'TE'
      //   },

        'Offense-WR-1' : {
          firstName: '',
          lastName: 'Olave',
          id: 39085,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'WR'
        },

      
        
        // 'Offense-TE-1' : {
        //   firstName: 'Lil',
        //   lastName: 'Humphrey',
        //   id: 16306,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'WR'
        //  },
        // 'Offense-RB-1' : {
        //   firstName: 'Mark',
        //   lastName: 'Ingram',
        //   id: 7647,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'RB'
        // },
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
        // 'Offense-RB-1' : {
        //   firstName: 'T',
        //   lastName: 'Hill',
        //   id: 12975,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'QB'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'TreQuon',
        //   lastName: 'Smith',
        //   id: 14717,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Marquez',
        //   lastName: 'Callaway',
        //   id: 19043,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'WR'
        // },
      }
    ],
    '48': [
      {
        'gdate': 1,
        

        // 'Offense-TE-1' : {
        //   firstName: 'James',
        //   lastName: 'Cook',
        //   id: 39137,
        //   status: 'Starter',
        //   abbreviation: 'BUF',
        //   position: 'RB'
        // },

       'Offense-TE-1' : {
          firstName: 'D',
          lastName: 'Kincaid',
          id: 79763,
          status: 'Starter',
          abbreviation: 'BUF',
          position: 'TE'
        },

      'Offense-WR-1' : {
          firstName: 'Ty',
          lastName: 'Johnson',
          id: 16424,
          status: 'Starter',
          abbreviation: 'BUF',
          position: 'RB'
        },
        
        
        // 'Offense-WR-2' : {
        //   firstName: 'I',
        //   lastName: 'McKenzie',
        //   id: 12923,
        //   status: 'Starter',
        //   abbreviation: 'BUF',
        //   position: 'WR'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Devin',
        //   lastName: 'Singletary',
        //   id: 16040,
        //   status: 'Starter',
        //   abbreviation: 'BUF',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Emmanuel',
        //   lastName: 'Sanders',
        //   id: 6756,
        //   status: 'Starter',
        //   abbreviation: 'BUF',
        //   position: 'WR'
        // },
      }
    ],
    '62': [
      {
        'gdate': 1,

        // 'Offense-TE-1' : {
        //   firstName: 'Luke',
        //   lastName: 'Musgrave',
        //   id: 79780,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'TE'
        // }, 
        

        'Offense-QB-1' : {
          firstName: 'M',
          lastName: 'Willis',
          id: 44956,
          status: 'Starter',
          abbreviation: 'GB',
          position: 'QB'
        },

        // 'Offense-WR-1' : {
        //   firstName: 'J',
        //   lastName: 'Reed',
        //   id: 79788,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'WR'
        // },

        // 'Offense-WR-2' : {
        //   firstName: '',
        //   lastName: 'Toure',
        //   id: 39209,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'WR'
        // }, 
        
        // 'Offense-WR-2' : {
        //   firstName: 'Romeo',
        //   lastName: 'Doubs',
        //   id: 39293,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'WR'
        // }, 
        // 'Offense-WR-1' : {
        //   firstName: 'Sammy',
        //   lastName: 'Watkins',
        //   id: 6224,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'WR'
        // }, 
     
        // 'Offense-RB-1' : {
        //   firstName: 'Aaron',
        //   lastName: 'Jones',
        //   id: 12978,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'RB'
        // }, 
        // 'Offense-RB-1' : {
        //   firstName: 'AJ',
        //   lastName: 'Dillon',
        //   id: 18606,
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
        // 'Offense-TE-1' : {
        //   firstName: 'Josiah',
        //   lastName: 'Deguara',
        //   id: 18605,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'TE'
        // }, 
    
        // 'Offense-TE-1' : {
        //   firstName: 'Randall',
        //   lastName: 'Cobb',
        //   id: 6926,
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
        'gdate': 11,

        'Offense-TE-1' : {
          firstName: 'Dalton',
          lastName: 'Schultz',
          id: 14679,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'TE'
        },

        'Offense-WR-2' : {
          firstName: 'Stefon',
          lastName: 'Diggs',
          id: 7471,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'WR'
        },

        'Offense-RB-1' : {
          firstName: 'Joe',
          lastName: 'Mixon',
          id: 12843,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'RB'
        },

        // 'Offense-WR-2' : {
        //   firstName: 'Tank',
        //   lastName: 'Dell',
        //   id: 112027,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'WR'
        // },

      // 'Offense-WR-2' : {
      //     firstName: 'Robert',
      //     lastName: 'Woods',
      //     id: 6225,
      //     status: 'Starter',
      //     abbreviation: 'HOU',
      //     position: 'WR'
      //   },
        
        //  'Offense-RB-1' : {
        //   firstName: 'R',
        //   lastName: 'Freeman',
        //   id: 14680,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'RB'
        // },

        // 'Offense-WR-2' : {
        //   firstName: 'P',
        //   lastName: 'Dorsett',
        //   id: 7104,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'WR'
        // },
     
  
        // 'Offense-WR-2' : {
        //   firstName: 'Anthony',
        //   lastName: 'Miller',
        //   id: 14665,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'WR'
        // },
        'Offense-WR-1' : {
          firstName: 'Nico',
          lastName: 'Collins',
          id: 30242,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'WR'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'Jordan',
        //   lastName: 'Akins',
        //   id: 14693,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'TE'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Rex',
        //   lastName: 'Burkhead',
        //   id: 6469,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'RB'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Brevin',
        //   lastName: 'Jordan',
        //   id: 30243,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'TE'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Danny',
        //   lastName: 'Amendola',
        //   id: 7560,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'OJ',
        //   lastName: 'Howard',
        //   id: 13491,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'TE'
        // },
        
      }
    ],
    '58': [
      {
        'gdate': 11,

        // 'Offense-QB-1' : {
        //   firstName: 'D',
        //   lastName: 'Thompson-Robinson',
        //   id: 108826,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'QB'
        // },

        'Offense-WR-1' : {
          firstName: 'Jerry',
          lastName: 'Jeudy',
          id: 18594,
          status: 'Starter',
          abbreviation: 'CLE',
          position: 'WR'
        },

     
        // 'Offense-WR-1' : {
        //   firstName: 'Rashard',
        //   lastName: 'Higgins',
        //   id: 9823,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'WR'
        // },

        

        // 'Offense-TE-1' : {
        //   firstName: 'H',
        //   lastName: 'Bryant',
        //   id: 18769,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'TE'
        // },

        // 'Offense-WR-1' : {
        //   firstName: 'Amari',
        //   lastName: 'Cooper',
        //   id: 7929,
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
        // 'Offense-TE-1' : {
        //   firstName: 'Kareem',
        //   lastName: 'Hunt',
        //   id: 13330,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'RB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'DeErnest',
        //   lastName: 'Johnson',
        //   id: 16858,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'RB'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'David',
        //   lastName: 'Njoku',
        //   id: 12875,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'TE'
        // },
       
      }
    ],
    '57': [
      {
        'gdate': 1,
        
        // 'Offense-RB-1' : {
        //   firstName: 'S',
        //   lastName: 'Perine',
        //   id: 13175,
        //   status: 'Starter',
        //   abbreviation: 'CIN',
        //   position: 'RB'
        // },
        
        'Offense-WR-2' : {
          firstName: 'Tee',
          lastName: 'Higgins',
          id: 18578,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'WR'
        },
        // 'Offense-WR-2' : {
        //   firstName: 'Tyler',
        //   lastName: 'Boyd',
        //   id: 9797,
        //   status: 'Starter',
        //   abbreviation: 'CIN',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'J',
        //   lastName: 'Chase',
        //   id: 30433,
        //   status: 'Starter',
        //   abbreviation: 'CIN',
        //   position: 'WR'
        // },
        
      }
    ],
    '61': [
      {
        'gdate': 11,

        'Offense-TE-1' : {
          firstName: 'S',
          lastName: 'LaPorta',
          id: 79772,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'TE'
        },

      //  'Offense-RB-1' : {
      //     firstName: 'Jahmyr',
      //     lastName: 'Gibbs',
      //     id: 79750,
      //     status: 'Starter',
      //     abbreviation: 'DET',
      //     position: 'RB'
      //   },

      // 'Offense-RB-1' : {
      //     firstName: 'David',
      //     lastName: 'Montgomery',
      //     id: 16039,
      //     status: 'Starter',
      //     abbreviation: 'DET',
      //     position: 'RB'
      //   }, 
   
        // 'Offense-WR-2' : {
        //   firstName: 'K',
        //   lastName: 'Raymond',
        //   id: 11501,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'D Andre',
        //   lastName: 'Swift',
        //   id: 18603,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Jermar',
        //   lastName: 'Jefferson',
        //   id: 30381,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Craig',
        //   lastName: 'Reynolds',
        //   id: 16492,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
        'Offense-WR-2' : {
          firstName: 'Josh',
          lastName: 'Reynolds',
          id: 13573,
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
      
        //  'Offense-RB-1' : {
        //   firstName: 'Adrian',
        //   lastName: 'Peterson',
        //   id: 7466,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
       
        
      }
    ],
    '68': [
      {
        'gdate': 1,

        

        'Offense-RB-1' : {
          firstName: 'B',
          lastName: 'Robinson',
          id: 79746,
          status: 'Starter',
          abbreviation: 'ATL',
          position: 'RB'
        },

        // 'Offense-TE-1' : {
        //   firstName: 'Mack',
        //   lastName: 'Hollins',
        //   id: 13280,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'WR'
        // },

        // 'Offense-WR-2' : {
        //   firstName: '',
        //   lastName: 'Byrd',
        //   id: 9772,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'RWR'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Cordarrelle',
        //   lastName: 'Patterson',
        //   id: 7477,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'RB'
        // },

        
        // 'Offense-WR-1' : {
        //   firstName: 'Caleb',
        //   lastName: 'Huntley',
        //   id: 30267,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'RB'
        // },
        'Offense-WR-2' : {
          firstName: 'T',
          lastName: 'Allgeir',
          id: 43337,
          status: 'Starter',
          abbreviation: 'ATL',
          position: 'RB'
        },
        'Offense-WR-1' : {
          firstName: 'Drake',
          lastName: 'London',
          id: 39082,
          status: 'Starter',
          abbreviation: 'ATL',
          position: 'WR'
        },
        // 'Offense-WR-2' : {
        //   firstName: 'Olamide',
        //   lastName: 'Zaccheaus',
        //   id: 16333,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'WR'
        // },
        'Offense-TE-1' : {
          firstName: 'Kyle',
          lastName: 'Pitts',
          id: 30432,
          status: 'Starter',
          abbreviation: 'ATL',
          position: 'TE'
        },
    
        
      }
    ],
    '60': [
      {
        'gdate': 1,

        // 'Offense-WR-2' : {
        //   firstName: 'B',
        //   lastName: 'Pringle',
        //   id: 14806,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'WR'
        // }, 

        // 'Offense-WR-1' : {
        //   firstName: 'Chase',
        //   lastName: 'Claypool',
        //   id: 18672,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'WR'
        // },
      
    
      
        // 'Offense-WR-2' : {
        //   firstName: 'Kahlil',
        //   lastName: 'Herbert',
        //   id: 30593,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'RB'
        // },
      
        // 'Offense-WR-2' : {
        //   firstName: 'Jakeem',
        //   lastName: 'Grant',
        //   id: 9929,
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
        'Offense-TE-1' : {
          firstName: 'Cole',
          lastName: 'Kmet',
          id: 18576,
          status: 'Starter',
          abbreviation: 'CHI',
          position: 'TE'
        },
        
        
      }
    ],
    '66': [
      {
        'gdate': 1,

        'Offense-WR-1' : {
          firstName: 'Christian',
          lastName: 'Kirk',
          id: 14654,
          status: 'Starter',
          abbreviation: 'JAX',
          position: 'WR'
        },

        'Offense-WR-2' : {
          firstName: 'Gabriel',
          lastName: 'Davis',
          id: 18734,
          status: 'Starter',
          abbreviation: 'JAX',
          position: 'WR'
        },

        // 'Offense-WR-2' : {
        //   firstName: 'Zay',
        //   lastName: 'Jones',
        //   id: 12769,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'WR'
        // },

        // 'Offense-WR-2' : {
        //   firstName: 'Calvin',
        //   lastName: 'Ridley',
        //   id: 14517,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'WR'
        // },

        // 'Offense-RB-1' : {
        //   firstName: 'J',
        //   lastName: 'Hasty',
        //   id: 19009,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'RB'
        // },

        // 'Offense-WR-1' : {
        //   firstName: 'Evan',
        //   lastName: 'Engram',
        //   id: 13094,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'TE'
        // },

        // 'Offense-WR-2' : {
        //   firstName: 'Jamal',
        //   lastName: 'Agnew',
        //   id: 12937,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'WR'
        // },

        // 'Offense-TE-1' : {
        //   firstName: 'Travis',
        //   lastName: 'Etienne',
        //   id: 30450,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'RB'
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
        // 'Offense-RB-1' : {
        //   firstName: 'Carlos',
        //   lastName: 'Hyde',
        //   id: 8381,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'RB'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Marvin',
        //   lastName: 'Jones',
        //   id: 6479,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'WR'
        // },
        
      }
    ],
    '75': [
      {
        'gdate': 11,

        // 'Offense-WR-2' : {
        //   firstName: 'D',
        //   lastName: 'Carter',
        //   id: 14973,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Josh',
        //   lastName: 'Palmer',
        //   id: 30926,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'G',
        //   lastName: 'Everett',
        //   id: 13409,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'TE'
        // },
   
        // 'Offense-TE-1' : {
        //   firstName: 'Joshua',
        //   lastName: 'Kelley',
        //   id: 18882,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Mike',
        //   lastName: 'Williams',
        //   id: 13398,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Keenan',
        //   lastName: 'Allen',
        //   id: 8199,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Austin',
        //   lastName: 'Ekeler',
        //   id: 13378,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'RB'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Jared',
        //   lastName: 'Cook',
        //   id: 8487,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'TE'
        // },
        
      }
    ],
    '59': [
      {
        'gdate': 1,

        // 'Offense-TE-1' : {
        //   firstName: 'J',
        //   lastName: 'Warren',
        //   id: 39253,
        //   status: 'Starter',
        //   abbreviation: 'PIT',
        //   position: 'RB'
        // },
          'Offense-QB-1' : {
          firstName: 'Justin',
          lastName: 'Fields',
          id: 30439,
          status: 'Starter',
          abbreviation: 'PIT',
          position: 'QB'
        },
        // 'Offense-QB-1' : {
        //   firstName: 'Kenny',
        //   lastName: 'Pickett',
        //   id: 39094,
        //   status: 'Starter',
        //   abbreviation: 'PIT',
        //   position: 'QB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'George',
        //   lastName: 'Pickens',
        //   id: 39126,
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
        //  'Offense-WR-2' : {
        //   firstName: '',
        //   lastName: 'Johnson',
        //   id: 16843,
        //   status: 'Starter',
        //   abbreviation: 'PIT',
        //   position: 'WR'
        // },
      }
    ],
    '56': [
      {
        'gdate': 1,

        // 'Offense-WR-1' : {
        //   firstName: 'I',
        //   lastName: 'Likely',
        //   id: 39757,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'TE'
        // },

        'Offense-WR-1' : {
          firstName: 'Z',
          lastName: 'Flowers',
          id: 79760,
          status: 'Starter',
          abbreviation: 'BAL',
          position: 'WR'
        },

        

        // 'Offense-WR-1' : {
        //   firstName: 'J',
        //   lastName: 'Oliver',
        //   id: 16727,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'TE'
        // },

        // 'Offense-WR-1' : {
        //   firstName: 'Kenyan',
        //   lastName: 'Drake',
        //   id: 9694,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'RB'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Rashod',
        //   lastName: 'Bateman',
        //   id: 30221,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'WR'
        // },
       
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
        'gdate': 11,

        // 'Offense-TE-1' : {
        //   firstName: 'T.J.',
        //   lastName: 'Hockenson',
        //   id: 16435,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'TE'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Irv',
        //   lastName: 'Smith',
        //   id: 16360,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'TE'
        // },

        'Offense-WR-2' : {
          firstName: 'KJ',
          lastName: 'Osborn',
          id: 18940,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'WR'
        },
       

        //  'Offense-TE-1' : {
        //   firstName: 'Johnny',
        //   lastName: 'Mundt',
        //   id: 12651,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'WR'
        // },
         
     
        // 'Offense-WR-2' : {
        //   firstName: 'Justin',
        //   lastName: 'Jefferson',
        //   id: 18648,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'WR'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Adam',
        //   lastName: 'Thielen',
        //   id: 7478,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Alex',
        //   lastName: 'Mattison',
        //   id: 16042,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'RB'
        // },
    
           
      }
    ],
    '49': [
      {
        'gdate': 1,

        // 'Offense-TE-1' : {
        //   firstName: 'Jeff',
        //   lastName: 'Wilson Jr.',
        //   id: 14846,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'RB'
        // },

         'Offense-TE-1' : {
          firstName: 'J',
          lastName: 'Smith',
          id: 13529,
          status: 'Starter',
          abbreviation: 'MIA',
          position: 'TE'
        },

        

        // 'Offense-WR-1' : {
        //   firstName: 'Tyreek',
        //   lastName: 'Hill',
        //   id: 9910,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'WR'
        // }, 

        // 'Offense-TE-1' : {
        //   firstName: '',
        //   lastName: 'Ahmed',
        //   id: 19004,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'RB'
        // },

        // 'Offense-TE-1' : {
        //   firstName: 'D',
        //   lastName: 'Achane',
        //   id: 79822,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'RB'
        // },
        // 'Offense-QB-1' : {
        //   firstName: 'Tua',
        //   lastName: 'Tagovailoa',
        //   id: 18641,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'QB'
        // },
        // 'Offense-QB-1' : {
        //   firstName: 'Teddy',
        //   lastName: 'Bridgewater',
        //   id: 7457,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'QB'
        // },
   
        // 'Offense-WR-2' : {
        //   firstName: 'Jaylen',
        //   lastName: 'Waddle',
        //   id: 30434,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'WR'
        // },

        // 'Offense-QB-1' : {
        //   firstName: 'Skylar',
        //   lastName: 'Thompson',
        //   id: 44961,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'QB'
        // },

        
        // 'Offense-TE-1' : {
        //   firstName: 'Chase',
        //   lastName: 'Edmonds',
        //   id: 14874,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'RB'
        // },
       
        // 'Offense-WR-1' : {
        //     firstName: 'Albert',
        //     lastName: 'Wilson',
        //     id: 7296,
        //     status: 'Starter',
        //     abbreviation: 'MIA',
        //     position: 'WR'
        //   },
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
     
        //  'Offense-RB-1' : {
        //   firstName: 'Malcolm',
        //   lastName: 'Brown',
        //   id: 8466,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'RB'
        // },
      }
    ],
    '65': [
      {
        'gdate': 1,

        // 'Offense-WR-1' : {
        //   firstName: 'Z',
        //   lastName: 'Moss',
        //   id: 18568,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'RB'
        // },

        'Offense-WR-1' : {
          firstName: 'Josh',
          lastName: 'Downs',
          id: 79817,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'WR'
        },

        'Offense-TE-1' : {
          firstName: 'A',
          lastName: 'Pierce',
          id: 39127,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'WR'
        },

        // 'Offense-WR-1' : {
        //   firstName: 'Parris',
        //   lastName: 'Campbell',
        //   id: 16668,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'WR'
        // },

        // 'Offense-WR-2' : {
        //   firstName: 'Ashton',
        //   lastName: 'Dullin',
        //   id: 16669,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'WR'
        // },

        // 'Offense-RB-1' : {
        //   firstName: 'Deon',
        //   lastName: 'Jackson',
        //   id: 30140,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'RB'
        // },
        

        //  'Offense-TE-1' : {
        //   firstName: 'Jelani',
        //   lastName: 'Woods',
        //   id: 39276,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'TE'
        // },
      
        // 'Offense-TE-1' : {
        //   firstName: 'Mo',
        //   lastName: 'Alie-Cox',
        //   id: 12672,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'TE'
        // },

        // 'Offense-RB-1' : {
        //   firstName: 'Johnny',
        //   lastName: 'Taylor',
        //   id: 18615,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'RB'
        // },
        'Offense-WR-2' : {
          firstName: 'M',
          lastName: 'Pittman',
          id: 18613,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'WR'
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
        // 'Offense-WR-2' : {
        //   firstName: 'Nyheim',
        //   lastName: 'Hines',
        //   id: 14696,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'RB'
        // },
        
      }
    ],
    '67': [
      {
        'gdate': 1,

         'Offense-TE-1' : {
          firstName: '',
          lastName: 'Spears',
          id: 79819,
          status: 'Starter',
          abbreviation: 'TEN',
          position: 'RB'
        },
        
        // 'Offense-WR-1' : {
        //   firstName: 'Treylon',
        //   lastName: 'Burks',
        //   id: 39092,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'WR'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'C',
        //   lastName: 'Okonkwo',
        //   id: 44936,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'TE'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Austin',
        //   lastName: 'Hooper',
        //   id: 9741,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'TE'
        // },

        // 'Offense-WR-1' : {
        //   firstName: 'D',
        //   lastName: 'Hilliard',
        //   id: 14816,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'RB'
        // },

  
     
        // 'Offense-WR-2' : {
        //   firstName: 'Nick',
        //   lastName: 'Westbrook',
        //   id: 23257,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'WR'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Dez',
        //   lastName: 'Fitzpatrick',
        //   id: 30717,
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
        // 'Offense-TE-1' : {
        //   firstName: 'Anthony',
        //   lastName: 'Firkser',
        //   id: 15274,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'TE'
        // },
      
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
        'gdate': 11,

        
        // 'Offense-TE-1' : {
        //   firstName: 'Chris',
        //   lastName: 'Otton',
        //   id: 43374,
        //   status: 'Starter',
        //   abbreviation: 'TB',
        //   position: 'TE'
        // },

        // 'Offense-TE-1' : {
        //   firstName: 'Julio',
        //   lastName: 'Jones',
        //   id: 6038,
        //   status: 'Starter',
        //   abbreviation: 'TB',
        //   position: 'WR'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Russell',
        //   lastName: 'Gage',
        //   id: 14658,
        //   status: 'Starter',
        //   abbreviation: 'TB',
        //   position: 'WR'
        // },
       
        'Offense-TE-1' : {
          firstName: 'Leonard',
          lastName: 'Fournette',
          id: 12606,
          status: 'Starter',
          abbreviation: 'TB',
          position: 'RB'
        },  
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
        // 'Offense-WR-1' : {
        //   firstName: 'Mike',
        //   lastName: 'Evans',
        //   id: 8562,
        //   status: 'Starter',
        //   abbreviation: 'TB',
        //   position: 'WR'
        // }, 
        // 'Offense-WR-1' : {
        //   firstName: 'Chris',
        //   lastName: 'Godwin',
        //   id: 13493,
        //   status: 'Starter',
        //   abbreviation: 'TB',
        //   position: 'WR'
        // },
        
      //   'Offense-TE-1' : {
      //   firstName: 'Rob',
      //   lastName: 'Gronk',
      //   id: 7575,
      //   status: 'Starter',
      //   abbreviation: 'TB',
      //   position: 'TE'
      //  },
      //  'Offense-WR-2' : {
      //     firstName: 'Scott',
      //     lastName: 'Miller',
      //     id: 16254,
      //     status: 'Starter',
      //     abbreviation: 'TB',
      //     position: 'WR'
      //   }, 
      }
    ],
    '73': [
      {
        'gdate': 1,

        // 'Offense-RB-1' : {
        //   firstName: 'C',
        //   lastName: 'Edwards-Helaire',
        //   id: 18623,
        //   status: 'Starter',
        //   abbreviation: 'KC',
        //   position: 'RB'
        // },

        // 'Offense-WR-1' : {
        //   firstName: 'Kadarius',
        //   lastName: 'Toney',
        //   id: 30447,
        //   status: 'Starter',
        //   abbreviation: 'KC',
        //   position: 'WR'
        // }, 

         'Offense-WR-2' : {
          firstName: 'X',
          lastName: 'Worthy',
          id: 133862,
          status: 'Starter',
          abbreviation: 'KC',
          position: 'WR'
        },
       

        // 'Offense-WR-1' : {
        //   firstName: 'JuJu',
        //   lastName: 'Smith-Schus',
        //   id: 13203,
        //   status: 'Starter',
        //   abbreviation: 'KC',
        //   position: 'WR'
        // },
       
     
        'Offense-TE-1' : {
          firstName: 'Travis',
          lastName: 'Kelce',
          id: 7299,
          status: 'Starter',
          abbreviation: 'KC',
          position: 'TE'
        }, 
       
     
        // 'Offense-WR-2' : {
        //   firstName: '',
        //   lastName: 'Hardman',
        //   id: 16765,
        //   status: 'Starter',
        //   abbreviation: 'KC',
        //   position: 'WR'
        // }, 
        // 'Offense-WR-1' : {
        //   firstName: 'Justin',
        //   lastName: 'Watson',
        //   id: 14734,
        //   status: 'Starter',
        //   abbreviation: 'KC',
        //   position: 'WR'
        // },

      // 'Offense-WR-1' : {
      //     firstName: '',
      //     lastName: 'Valdes',
      //     id: 14688,
      //     status: 'Starter',
      //     abbreviation: 'KC',
      //     position: 'WR'
      //   }, 
        
      }
    ],
    '77': [
      {
        'gdate': 11,

        // 'Offense-WR-1' : {
        //   firstName: 'Allen',
        //   lastName: 'Robinson',
        //   id: 7198,
        //   status: 'Starter',
        //   abbreviation: 'LA',
        //   position: 'WR'
        // },

        'Offense-WR-1' : {
          firstName: 'Ben',
          lastName: 'Skowronek',
          id: 32265,
          status: 'Starter',
          abbreviation: 'LA',
          position: 'WR'
        },
      
        // 'Offense-WR-2' : {
        //   firstName: 'Cooper',
        //   lastName: 'Kupp',
        //   id: 13412,
        //   status: 'Starter',
        //   abbreviation: 'LA',
        //   position: 'WR'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Sony',
        //   lastName: 'Michel',
        //   id: 14522,
        //   status: 'Starter',
        //   abbreviation: 'LA',
        //   position: 'RB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Cam',
        //   lastName: 'Akers',
        //   id: 18640,
        //   status: 'Starter',
        //   abbreviation: 'LA',
        //   position: 'RB'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Odell',
        //   lastName: 'Beckham Jr.',
        //   id: 7746,
        //   status: 'Starter',
        //   abbreviation: 'LA',
        //   position: 'WR'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Van',
        //   lastName: 'Jefferson',
        //   id: 18635,
        //   status: 'Starter',
        //   abbreviation: 'LA',
        //   position: 'WR'
        // },
          
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
