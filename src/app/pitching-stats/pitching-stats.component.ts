import { Component, ViewChild, Inject, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { FirebaseService } from '../firebase.service';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';


let headers = null;
let options = null;

//export interface Data {}
export interface Data {
  id: any;
  pitches: any;
  strikeouts: any;
  pitcherWalks: any;
  inningsPitched: any;
  pitchesPerInning: any;
  pitcherWildPitches: any;
  pickoffAttempts: any;
}

@Component({
  selector: 'app-pitching-stats',
  templateUrl: './pitching-stats.component.html',
  styleUrls: ['./pitching-stats.component.css']
})
export class PitchingStatsComponent implements OnInit {

  players: Array < any > ;
  myData: Array < any > ;
  playerInfo: Array < any > ;
  statData: Array < any > ;
  matchupData: Array < any > ;
  dailyStats: Array < any > ;
  score: Array < any > ;
  dailySchedule: Array < any > ;
  fastballData: Array < any > ;
  gameIdData: Array < any > ;
  starterIdData: Array < any > = [];
  specificFastballData: Array < any > = [];
  speedResults: Array < any > = [];
  startersData: Array < any > = [];
  loading: boolean = true;
  live: boolean = false;
  gamesToday: boolean = false;
  noGamesToday: boolean = false;
  gameToday: boolean = false;
  selected: any;
  scrollHeight: any;
  scrollTop: any;
  stat: string = '';
  defineToken: string = '';
  apiRoot: string = "https://api.mysportsfeeds.com/v1.2/pull/mlb/2018-regular";

  //MAT-TABLE 
  displayedColumns = [
    'id',
    'pitches',
    'strikeouts',
    'pitcherWalks',
    'inningsPitched',
    'pitchesPerInning',
    'pitcherWildPitches',
    'pickoffAttempts'
  ];

  //dataSource: any;

  //dataSource = new MatTableDataSource(this.statData);

  @ViewChild(MatSort) sort: MatSort;

  dataSource: MyDataSource;
  //@ViewChild(MdSort) sort: MdSort;
  //@ViewChild('filter') filter: ElementRef;
 
  pitcherspeed: { pitcher: string, pitchspeedStart: string, lastName: string, gameid: string };

  constructor(public dialog: MatDialog, private dataService: DataService, private firebaseService: FirebaseService, private http: HttpClient) {
    //this.players = this.dataService.getSentStats();
  }

  loadEnv() {
    // LOAD SOME DATA WHEN CLICK ON DIALOG TO SAVE LOADING TIME. 
    this.dataService
      .getEnv().subscribe(res => {
       
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa('ianposton' + ":" + res));
       
        this.dataService
          .sendHeaderOptions(headers);
       

        //THESE FUNCTIONS WORK TOGETHER TO MAKE MULTIPLE API CALLS AND PUSH IT ALL TO FIREBASE
      //   this.dataService
      //     .getGameId().subscribe(res => {
      //       console.log(res, 'gameID data!');
      //       //THIS CHUNK MAKES MULTIPLE API CALLS AND SAVES LARGE CHUNKS OF DATA TO FIREBASE
      //       Observable.forkJoin(
      //         res['fullgameschedule'].gameentry.map(
      //           g =>
      //           this.http.get(`${this.apiRoot}/game_playbyplay.json?gameid=` + g.id + `&status=final`, {headers})
               
      //         )
      //       ).subscribe(res => {
      //         let i;
      //         let i2;
      //         let game2;
      //         res.forEach((item, index) => {
      //           i = index;
      //           console.log(res[i]['gameplaybyplay'], 'got game data!');

      // if(res[i]['gameplaybyplay'].atBats != null) {
      //   game2 = res[i]['gameplaybyplay'].game;

      //   res[i]['gameplaybyplay'].atBats.atBat.forEach((item2, index) => {
      //       i2 = index;
      //       //console.log(item2.atBatPlay, 'atbatplay items...');
      //       item2.atBatPlay.forEach((item3, index) => {
      //         let f = item3;

      //         if (f.pitch != undefined && f.pitch.ballStartSpeed != undefined) {
      //           //console.log(f.pitch);
      //           this.pitcherspeed = {
      //             pitcher: f.pitch.pitchingPlayer.ID,
      //             pitchspeedStart: f.pitch.ballStartSpeed,
      //             lastName: f.pitch.pitchingPlayer.LastName,
      //             gameid: game2.id,
      //           }
      //           this.specificFastballData.push(this.pitcherspeed);

      //         }

      //       })


      //     })

      //     this.speedResults = this.specificFastballData.reduce(function(r, a) {
      //       r[a.pitcher] = r[a.pitcher] || [];
      //       r[a.pitcher].push(a.pitchspeedStart);
      //       return r
      //     }, Object.create(null));
      //     console.log('made groups of pichers pitch speeds by ID...');

      // }
          



      //         });

      //            //this.loadData();
      //       });
                
      //     });

        this.dataService
          .getDailySchedule().subscribe(res => {

            console.log(res['dailygameschedule'], "schedule...");
            this.dailySchedule = res['dailygameschedule'].gameentry;
            if (res['dailygameschedule'].gameentry == null) {
              this.noGamesToday = true;
              console.log('There are no games being played today.');
            } else {
              this.gamesToday = true;

              Observable.forkJoin(
                  res['dailygameschedule'].gameentry.map(
                    g =>
                    this.http.get(`${this.apiRoot}/game_startinglineup.json?gameid=` + g.id + `&position=P`, {headers})
                  
                  )
                )
                .subscribe(res => {
                  console.log(res, 'making several calls by GAME ID for starting lineups...');

                  let i;
                  let i2;
                  let res2;
                  res.forEach((item, index) => {
                    i = index;
                    //console.log(res[i]['gamestartinglineup'].teamLineup, 'got starting lineups data!');
                    res2 = res[i]['gamestartinglineup'].teamLineup
                    res2.forEach((item, index) => {
                      i2 = index;
                      if (res2[i2].expected === null) {
                        console.log(res2[i2], 'starter is NULL in here. ERROR.');
                        this.starterIdData.push(res2[i2].team['ID']);
                      } else {
                        //console.log(res2[i2].expected.starter[0].player.ID, 'got player ID!');
                        this.starterIdData.push(res2[i2].expected.starter[0].player.ID);
                        //console.log(this.starterIdData, 'this array has ALL the IDs of todays starters');
                      }

                    });
                  });

                });
            }

            this.loadData();


          })

     });

    this.firebaseService
      .getData()
      .subscribe(x => {
        console.log(x, 'got response from firebase...');
        //this.loadData();
        this.fastballData = x;
      });
  }

  loadData() {

    if (this.gamesToday === true) {
      this.dataService
        .getDaily().subscribe(res => {
          console.log(res, "Daily stats...");
          this.dailyStats = res['dailyplayerstats'].playerstatsentry;
        })
      this.dataService
        .getScore().subscribe(res => {
          console.log(res['scoreboard'].gameScore, "Score...");
          this.score = res['scoreboard'].gameScore;
        })
    } else {
      console.log('No games then no daily stats either. :(');
    }


    this.dataService
      .getInfo().subscribe(res => {
        console.log(res, 'got activeplayers from api!');
        this.playerInfo = res['activeplayers'].playerentry;
      });

    //THESE FUNCTIONS GET PLAYER INFO AND CREATE CUSTOM PLAYER VALUES BARROWED FROM SEPARATE API CALL
    this.dataService
      .getAllStats().subscribe(res => {
        console.log(res, 'got cumulativeplayerstats!');

        this.myData = res['cumulativeplayerstats'].playerstatsentry;

        if (this.starterIdData.length > 0 || this.noGamesToday === true) {

          if (this.myData && this.starterIdData && this.gamesToday === true) {
            console.log('start sorting data for starters...');
            for (let startid of this.starterIdData) {

              for (let startdata of this.myData) {

                if (startid === startdata.player.ID) {
                  startdata.player.startingToday = true;
                }

                if (startdata.team != null && startid === startdata.team.ID) {
                  startdata.team.teamPlayingToday = true;
                  this.gameToday = true;
                } 
              }
            }

          }

          if (this.myData && this.fastballData) {
            console.log('start sorting players for pitch speeds from firebase...');
            for (let fastballspeed of this.fastballData) {
              for (let speeddata of this.myData) {
                if (fastballspeed.ID === speeddata.player.ID) {
                  speeddata.player.pitchSpeedAvg = fastballspeed.pitchSpeedAvg;
                  speeddata.player.fastestPitch = fastballspeed.fastestPitch;
                }

              }
            }

          }

          if (this.myData && this.dailySchedule) {
            console.log('start sorting data for daily schedule...');
            for (let schedule of this.dailySchedule) {

              for (let sdata of this.myData) {
                
                if (schedule.awayTeam.Name === sdata.team.Name) {
                  sdata.player.gameTime = schedule.time;
                  sdata.team.gameField = schedule.location;
                  sdata.team.gameId = schedule.id;
                  sdata.player.gameLocation = "away";
                  sdata.team.opponent = schedule.homeTeam.City + ' ' + schedule.homeTeam.Name;
                  sdata.team.opponentCity = schedule.homeTeam.City;
                  sdata.team.opponentId = schedule.homeTeam.ID;

                }
                if (schedule.homeTeam.Name === sdata.team.Name) {
                  sdata.player.gameTime = schedule.time;
                  sdata.team.gameField = schedule.location;
                  sdata.team.gameId = schedule.id;
                  sdata.player.gameLocation = "home";
                  sdata.team.opponent = schedule.awayTeam.City + ' ' + schedule.awayTeam.Name;
                  sdata.team.opponentCity = schedule.awayTeam.City;
                  sdata.team.opponentId = schedule.awayTeam.ID;
                }
              }
            }
          }

          if (this.myData && this.dailyStats) {
            console.log('start sorting data for daily stats...');
            for (let daily of this.dailyStats) {
              for (let mdata of this.myData) {
                if (daily.player.ID === mdata.player.ID) {
                  mdata.player.playingToday = true;
                  mdata.player.winToday = daily.stats.Wins['#text'];
                  mdata.player.loseToday = daily.stats.Losses['#text'];
                  mdata.player.saveToday = daily.stats.Saves['#text'];
                  mdata.player.inningsToday = daily.stats.InningsPitched['#text'];
                  mdata.player.earnedrunsToday = daily.stats.EarnedRunsAllowed['#text'];
                  mdata.player.strikeoutsToday = daily.stats.PitcherStrikeouts['#text'];
                  mdata.player.hitsallowedToday = daily.stats.HitsAllowed['#text'];
                  mdata.player.pitchesthrownToday = daily.stats.PitchesThrown['#text'];
                } 
              }
            }
          }

          if (this.myData && this.score) {
            console.log('start sorting data for scoreboard stats...');
            for (let sc of this.score) {
              for (let pdata of this.myData) {
                if (pdata.player.startingToday === true) {
                  this.startersData.push(pdata);
                }
                // USE GAMEID TO CHECK FOR OPPOSING PITCHER 
                if (sc.game.awayTeam.Abbreviation === pdata.team.Abbreviation) {

                  //console.log(sc, 'score items');
                  pdata.team.awayPitcher = pdata.player.FirstName + ' ' + pdata.player.LastName;
                  pdata.team.opponentAbbreviation = sc.game.homeTeam.Abbreviation;
                  pdata.team.teamScore = sc.awayScore;
                  pdata.team.opponentScore = sc.homeScore;
                  pdata.team.currentInning = sc.currentInning;
                  pdata.team.currentInningHalf = sc.currentInningHalf;
                  pdata.team.isGameOver = sc.isCompleted;
                  pdata.team.isGameInProgress = sc.isInProgress;
                  pdata.team.isGameUnplayed = sc.isUnplayed;
                  if (sc.playStatus != null) {
                    //console.log(sc.playStatus, 'play status');
                    pdata.team.balls = sc.playStatus.ballCount;
                    pdata.team.strikes = sc.playStatus.strikeCount;
                    pdata.team.outs = sc.playStatus.outCount;
                    if (sc.playStatus['batter'] != null) {
                      pdata.team.currentBatter = sc.playStatus['batter'].FirstName + ' ' + sc.playStatus['batter'].LastName;
                    }
                    if (sc.playStatus['firstBaseRunner'] != null) {
                      pdata.team.firstBaseRunner = sc.playStatus['firstBaseRunner'].FirstName + ' ' + sc.playStatus['firstBaseRunner'].LastName;

                    }
                    if (sc.playStatus['secondBaseRunner'] != null) {
                      pdata.team.secondBaseRunner = sc.playStatus['secondBaseRunner'].FirstName + ' ' + sc.playStatus['secondBaseRunner'].LastName;
                    }
                    if (sc.playStatus['thirdBaseRunner'] != null) {
                      pdata.team.thirdBaseRunner = sc.playStatus['thirdBaseRunner'].FirstName + ' ' + sc.playStatus['thirdBaseRunner'].LastName;
                    }
                    pdata.team.currentPitcher = sc.playStatus.pitcher['ID'];
                  }

                }
                if (sc.game.homeTeam.Abbreviation === pdata.team.Abbreviation) {

                  pdata.team.homePitcher = pdata.player.FirstName + ' ' + pdata.player.LastName;
                  pdata.team.opponentAbbreviation = sc.game.awayTeam.Abbreviation;
                  pdata.team.opponentScore = sc.awayScore;
                  pdata.team.teamScore = sc.homeScore;
                  pdata.team.currentInning = sc.currentInning;
                  pdata.team.currentInningHalf = sc.currentInningHalf;
                  pdata.team.isGameOver = sc.isCompleted;
                  pdata.team.isGameInProgress = sc.isInProgress;
                  pdata.team.isGameUnplayed = sc.isUnplayed;
                  if (sc.playStatus != null) {
                    console.log(sc.playStatus, 'play status');
                    pdata.team.balls = sc.playStatus.ballCount;
                    pdata.team.strikes = sc.playStatus.strikeCount;
                    pdata.team.outs = sc.playStatus.outCount;
                    if (sc.playStatus['batter'] != null) {
                      pdata.team.currentBatter = sc.playStatus['batter'].FirstName + ' ' + sc.playStatus['batter'].LastName;
                    }
                    if (sc.playStatus['firstBaseRunner'] != null) {
                      pdata.team.firstBaseRunner = sc.playStatus['firstBaseRunner'].FirstName + ' ' + sc.playStatus['firstBaseRunner'].LastName;
                    }
                    if (sc.playStatus['secondBaseRunner'] != null) {
                      pdata.team.secondBaseRunner = sc.playStatus['secondBaseRunner'].FirstName + ' ' + sc.playStatus['secondBaseRunner'].LastName;
                    }
                    if (sc.playStatus['thirdBaseRunner'] != null) {
                      pdata.team.thirdBaseRunner = sc.playStatus['thirdBaseRunner'].FirstName + ' ' + sc.playStatus['thirdBaseRunner'].LastName;
                    }

                    pdata.team.currentPitcher = sc.playStatus.pitcher['ID'];
                  }

                }

              }
            }
          }

           if (this.myData && this.specificFastballData) {
             let gameIDArray = []
            console.log('start sorting for last game IDs...');
            for (let sfd of this.specificFastballData) {
              for (let data of this.myData) {
                if (sfd.pitcher === data.player.ID) {
                  gameIDArray.push(sfd.gameid);
                  data.player.lastgameId = gameIDArray;
                }
              }
            }
          }

          if (this.myData && this.playerInfo) {
            console.log('start sorting data for pictures and other info about player...');
            for (let info of this.playerInfo) {
              for (let data of this.myData) {
                
                // if (data.team.Abbreviation === 'HOU' || data.team.Abbreviation === 'CLE' || data.team.Abbreviation === 'NYY' || data.team.Abbreviation === 'MIN' || data.team.Abbreviation === 'BOS') {
                //   data.player.americanLeaguePlayoff = true;
                // }

                // if (data.team.Abbreviation === 'LAD' || data.team.Abbreviation === 'WAS' || data.team.Abbreviation === 'CHC' || data.team.Abbreviation === 'ARI' || data.team.Abbreviation === 'COL') {
                //   data.player.nationalLeaguePlayoff = true;
                // }

                if (info.player.ID === data.player.ID) {
                  if (data.stats.Pitcher2SeamFastballs && data.stats.Pitcher4SeamFastballs && data.stats.PitcherChangeups && data.stats.PitcherCurveballs && data.stats.PitcherCutters && data.stats.PitcherSliders && data.stats.PitcherSinkers && data.stats.PitcherSplitters) {
                    data.player.favPitch = Math.max(parseInt(data.stats.Pitcher2SeamFastballs['#text'], 10), parseInt(data.stats.Pitcher4SeamFastballs['#text'], 10), parseInt(data.stats.PitcherChangeups['#text'], 10), parseInt(data.stats.PitcherCurveballs['#text'], 10), parseInt(data.stats.PitcherCutters['#text'], 10), parseInt(data.stats.PitcherSliders['#text'], 10), parseInt(data.stats.PitcherSinkers['#text'], 10), parseInt(data.stats.PitcherSplitters['#text'], 10));
                    data.player.favPitchPercent = Math.floor(data.player.favPitch / parseInt(data.stats.PitchesThrown['#text'], 10) * 100);
                  }
                  data.player.image = info.player.officialImageSrc;
                  data.player.age = info.player.Age;

                  if (info.player.BirthCity != null) {
                    data.player.city = info.player.BirthCity;
                  } else {
                    data.player.city = '';
                  }
                  if (info.player.BirthCountry != null) {
                    data.player.country = info.player.BirthCountry;
                  } else {
                    data.player.country = '';
                  }
                      if (info.player.BirthDate != null) {
                    data.player.BirthDate = info.player.BirthDate;
                  } else {
                    data.player.BirthDate = '';
                  }
                  if (info.player.College != null) {
                    data.player.College = info.player.College;
                  } else {
                    data.player.College = '';
                  }
                  if (info.player.HighSchool != null) {
                    data.player.HighSchool = info.player.HighSchool;
                  } else {
                    data.player.HighSchool = '';
                  }
                  if (info.player.currentContractYear != null) {
                    data.player.ContractBaseSalary = info.player.currentContractYear.BaseSalary;
                  } else {
                    data.player.ContractBaseSalary = '';
                  }
                  if (info.player.currentContractYear != null) {
                    data.player.ContractTotalSalary = info.player.currentContractYear.overallContract.TotalSalary;
                  } else {
                    data.player.ContractTotalSalary = '';
                  }
                  if (info.player.currentContractYear != null) {
                    data.player.ContractTotalYears = info.player.currentContractYear.overallContract.TotalYears;
                  } else {
                    data.player.ContractTotalYears = '';
                  }
                  if (info.player.currentContractYear != null) {
                    data.player.ContractStartYear = info.player.currentContractYear.SeasonStartYear;
                  } else {
                    data.player.ContractStartYear = '';
                  }
                  if (info.player.draft != null) {
                    data.player.DraftOverallPick = info.player.draft.OverallPick;
                  } else {
                    data.player.DraftOverallPick = '';
                  }
                 if (info.player.draft != null) {
                    data.player.DraftRound = info.player.draft.Round;
                  } else {
                    data.player.DraftRound = '';
                  }
                  if (info.player.draft != null) {
                    data.player.DraftRoundPick = info.player.draft.RoundPick;
                  } else {
                    data.player.DraftRoundPick = '';
                  }
                  if (info.player.draft != null) {
                    data.player.DraftYear = info.player.draft.Year;
                  } else {
                    data.player.DraftYear = '';
                  }
                  if (info.player.draft != null) {
                    data.player.DraftOverallPick = info.player.draft.OverallPick;
                  } else {
                    data.player.DraftOverallPick = '';
                  }
                  if (info.player.handedness != null) {
                    data.player.Throws = info.player.handedness.Throws;
                  } else {
                    data.player.Throws = '';
                  }
                  if (info.player.handedness != null) {
                    data.player.Bats = info.player.handedness.Bats;
                  } else {
                    data.player.Bats = '';
                  }
                  if (info.player.Height != null) {
                    data.player.Height = info.player.Height;
                  } else {
                     data.player.Height = '';
                  }
                  if (info.player.Weight != null) {
                    data.player.Weight = info.player.Weight;
                  } else {
                     data.player.Weight = '';
                  }
                  if (info.player.Twitter != null) {
                    data.player.Twitter = info.player.Twitter;
                  } else {
                     data.player.Twitter = '';
                  }
                  data.player.IsRookie = info.player.IsRookie;
                  if (data.player.inningsToday == null) {
                    data.player.inningsToday = '0';
                  }


                  //STAT-DATA IS CALLED IN THE HTML
                  this.statData = this.myData;

                  //This fills the table with data
                  //this.dataSource = new MatTableDataSource(this.statData);
                  this.dataSource = new MyDataSource(this.statData, this.sort);
                  //this.dataSource = new MyDataSource(this.statData);


                }



              }
            }


            //MAKE MATCHUPS BY GAME ID OF STARTERS AND NON STARTERS
            this.matchupData = this.startersData.reduce(function(r, a) {
              r[a.team.gameId] = r[a.team.gameId] || [];

              r[a.team.gameId].push(a);
              return r

            }, Object.create(null));
            //console.log(this.matchupData, 'made matchups of starting pitchers by game ID...');

            //THIS FOR LOOP GETS HOME STARTING PITCHERS AND THERE STARTING OPPONENT 
            this.startersData.forEach((data) => {

              data.team.matchup = this.matchupData[data.team.gameId];
              //console.log(this.matchupData[data.team.gameId], 'show this');

            })

            // this.dataService
            //   .sendStats(this.statData);

          }
        }

        //THIS FOR LOOP GETS AVG PITCH SPEED FOR EVERY PITCHER IN THIS LIST
        // this.myData.forEach((data, index) => {
           

        //   if (this.speedResults[data.player.ID]) {
        //     let avg =  this.speedResults[data.player.ID].reduce((r, a) => {

        //       return r + parseInt(a);

        //     }, 0) /  this.speedResults[data.player.ID].length;

        //     let max = this.speedResults[data.player.ID].reduce(function(a, b) {
        //         return Math.max(a, b);
        //     });

        //     data.player.pitchSpeedAvg = Math.floor(avg);
        //     data.player.fastestPitch = max;
        //     //console.log(data.player, 'average pitch speed about to save to fb....');
        //     this.firebaseService
        //       .addData(data.player);

        //   }

        // });

        this.loading = false;
      });


  }

  ngOnInit() {
    // IF ALL THE PITCHING DATA IS DEFINED DON'T RUN LOADENV()
    // WHICH CALLS THE API FOR DATA
    // ELSE GET THE DATA SAVED IN THE INFO SERVICE 
    // AVOID LONG RELOADING TIME
    if (this.players === undefined) {
      this.loadEnv();
      // Observable.fromEvent(this.filter.nativeElement, 'keyup')
      //   .debounceTime(150)
      //   .distinctUntilChanged()
      //   .subscribe(() => {
      //     if (!this.dataSource) { return; }
      //     this.dataSource.filter = this.filter.nativeElement.value;
      //   });
    } else {

      //This fills the table with data
      //this.dataSource = new MatTableDataSource(this.players);
      this.dataSource = new MyDataSource(this.players, this.sort);
      //this.dataSource = new MyDataSource(this.players);

      setInterval(() => {
        this.loading = false;
      }, 0)

      for (let p of this.players) {
        if (p.player.playingToday || p.player.startingToday) {
          this.live = true;
        }
      }

    }
  }


  public open(event, data) {
    this.selected = data;
    console.log(data, 'ok you clicked on a table row....');
    this.dialog.open(MyDialog, {
      data: data,
      width: '600px',
    });
  }

  public isActive(data) {
    return this.selected === data;
  };

  public isVisibleOnMobile() {
    // console.log('width under 600px');
  }

  public isVisibleOnDesktop() {
    // console.log('width over 600px');
  }


 // ngAfterViewInit() {
 //   if (this.statData ! = null) {
     
 //     this.dataSource.sort = this.sort;
 //   }
 
    
 // }


}

@Component({
  selector: 'my-dialog',
  template: `<mat-dialog-content>
  <i class="material-icons" (click)="dialogRef.close()" style="float:right; cursor:pointer;">close</i>
</mat-dialog-content>
<mat-grid-list cols="3" rowHeight="200px" class="dialog-head">
  <mat-grid-tile [colspan]="1">
    <img src="{{ data.player.image }}">
  </mat-grid-tile>
  <mat-grid-tile [colspan]="2">
    <p>{{ data.player.FirstName + ' ' + data.player.LastName + ' (' + data.team.Name + ' - ' + data.player.Position + ')'}} <span *ngIf="data.player.IsRookie == 'true'" style="background:#2ecc71; color:#fff; padding:1px; border-radius:2px;">Rookie</span>
      <br> Age: {{data.player.age}} Height: {{data.player.Height}} Weight: {{data.player.Weight}}
      <br> Birth City: {{data.player.city +', '+ data.player.country}}
      <br> Number: {{data.player.JerseyNumber}}
      <br> Opponent: <span *ngIf="data.team.opponent;then content else other_content"></span> <ng-template #content>{{data.team.opponent}}</ng-template> <ng-template #other_content>No game today.</ng-template>
      <span *ngIf="data.team.matchup != null && data.player.ID != data.team.matchup[0].player.ID"><br>Pitching Opponent: {{data.team.matchup[0].player.FirstName + ' ' + data.team.matchup[0].player.LastName}}</span>
      <span *ngIf="data.team.matchup != null && data.player.ID != data.team.matchup[1].player.ID"><br>Pitching Opponent: {{data.team.matchup[1].player.FirstName + ' ' + data.team.matchup[1].player.LastName}}</span>
      <span *ngIf="data.team.opponent"><br>Game info: {{data.player.gameTime}} EST, {{data.team.gameField}} </span> 
      <span *ngIf="data.player.americanLeaguePlayoff || data.player.nationalLeaguePlayoff"><br>Playoff Info: {{data.team.City}} made the playoffs. </span>
      <span *ngIf="data.player.startingToday" style="background:#2ecc71; color:#fff; padding:1px; border-radius:2px;"><br>Starter for today's {{data.player.gameLocation}} game. </span></p>
  </mat-grid-tile>
</mat-grid-list>
<mat-grid-list cols="3" rowHeight="50px">
  <mat-grid-tile [colspan]="1">
    <h1><b>W-L:</b> {{ data.stats.Wins['#text'] +'-'+ data.stats.Losses['#text'] }}</h1>
  </mat-grid-tile>
  <mat-grid-tile [colspan]="1">
    <h1><b>ERA:</b> {{ data.stats.EarnedRunAvg['#text'] }}</h1>
  </mat-grid-tile>
  <mat-grid-tile [colspan]="1">
    <h1><b>K's:</b> {{ data.stats.PitcherStrikeouts['#text'] }}</h1>
  </mat-grid-tile>
</mat-grid-list>
<div class="fav-pitch live-pitch" *ngIf="data.player.winToday == '0' && data.player.saveToday == '0' && data.player.loseToday == '0'">
 (live stats) Game Time: {{data.player.gameTime}} EST <span *ngIf="data.player.gameLocation === 'away'">@{{data.team.opponentCity}}</span>
  <h2>{{ data.player.FirstName + ' ' + data.player.LastName}} pitched  <div *ngIf="data.player.inningsToday === '1.0';then pt else other_pt"></div> <ng-template #pt>1 inning</ng-template> <ng-template #other_pt>{{data.player.inningsToday}} innings</ng-template>, {{data.player.strikeoutsToday}}  <div *ngIf="data.player.strikeoutsToday === '1';then k else other_k"></div> <ng-template #k>strikeout</ng-template> <ng-template #other_k>strikeouts</ng-template> and gave up {{data.player.earnedrunsToday}} <div *ngIf="data.player.earnedrunsToday === '1';then r else other_r"></div> <ng-template #r>run</ng-template> <ng-template #other_r>runs</ng-template> today!</h2>
  <button mat-button class="more-stats-btn" [routerLink]="['/daily-stats', data.player.ID]" (click)="dialogRef.close()">MORE STATS</button>
</div>
<div class="fav-pitch" *ngIf="data.player.winToday == '1'">
  <h2>{{ data.player.FirstName + ' ' + data.player.LastName}} got a Win today!</h2>
    <button mat-button class="more-stats-btn" [routerLink]="['/daily-stats', data.player.ID]" (click)="dialogRef.close()">MORE STATS</button>
</div>
<div class="fav-pitch" *ngIf="data.player.loseToday == '1'">
  <h2>{{ data.player.FirstName + ' ' + data.player.LastName}} Lost today!</h2>
    <button mat-button class="more-stats-btn" [routerLink]="['/daily-stats', data.player.ID]" (click)="dialogRef.close()">MORE STATS</button>
</div>
<div class="fav-pitch" *ngIf="data.player.saveToday == '1'">
  <h2>{{ data.player.FirstName + ' ' + data.player.LastName}} got a Save today!</h2>
    <button mat-button class="more-stats-btn" [routerLink]="['/daily-stats', data.player.ID]" (click)="dialogRef.close()">MORE STATS</button>
</div>
<div class="fav-pitch">
  <h2 *ngIf="data.player.favPitch == data.stats.Pitcher2SeamFastballs['#text']">Uses the 2-Seam Fastball {{data.player.favPitchPercent}}% of pitches thrown.</h2>
  <h2 *ngIf="data.player.favPitch == data.stats.Pitcher4SeamFastballs['#text']">Uses the 4-Seam Fastball {{data.player.favPitchPercent}}% of pitches thrown.</h2>
  <h2 *ngIf="data.player.favPitch == data.stats.PitcherChangeups['#text']">Uses the Changeup {{data.player.favPitchPercent}}% of pitches thrown.</h2>
  <h2 *ngIf="data.player.favPitch == data.stats.PitcherCurveballs['#text']">Uses the Curveball {{data.player.favPitchPercent}}% of pitches thrown.</h2>
  <h2 *ngIf="data.player.favPitch == data.stats.PitcherCutters['#text']">Uses the Cutter {{data.player.favPitchPercent}}% of pitches thrown.</h2>
  <h2 *ngIf="data.player.favPitch == data.stats.PitcherSliders['#text']">Uses the Slider {{data.player.favPitchPercent}}% of pitches thrown.</h2>
  <h2 *ngIf="data.player.favPitch == data.stats.PitcherSinkers['#text']">Uses the Sinker {{data.player.favPitchPercent}}% of pitches thrown.</h2>
  <h2 *ngIf="data.player.favPitch == data.stats.PitcherSplitters['#text']">Uses the Splitter {{data.player.favPitchPercent}}% of pitches thrown.</h2>
</div>
<div class="fav-pitch" *ngIf="data.player.pitchSpeedAvg">
  <h2>Avg pitch speed is {{data.player.pitchSpeedAvg}}mph</h2>
</div>
<div class="fav-pitch" *ngIf="data.player.fastestPitch">
  <h2>Top pitch speed {{data.player.fastestPitch}}mph</h2>
</div>`,
})

export class MyDialog {
  constructor(public dialogRef: MatDialogRef < MyDialog > , @Inject(MAT_DIALOG_DATA) public data: any) {}
}

// export class MyDataSource extends DataSource < Data > {

//    _filterChange = new BehaviorSubject('');
//   get filter(): string { return this._filterChange.value; }
//   set filter(filter: string) { this._filterChange.next(filter); }

//   constructor(private datas: Data[]) {

//     super();
//   }



//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable < Data[] > {
//    const displayDataChanges = [
//       //this.datas.dataChange,
//       this._filterChange
//     ];

//     return Observable.merge(...displayDataChanges).map(() => {
//       return this.datas.slice().filter((item: Data) => {
//         let searchStr = (item['player'].FirstName).toLowerCase();
//         return searchStr.indexOf(this.filter.toLowerCase()) != -1;
//       });
//     });
//   }

//   disconnect() {}

 

// }

export class MyDataSource extends DataSource < Data > {

  constructor(private datas: Data[], private sort: MatSort) {
    super();
  }



  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable < Data[] > {
    //return Observable.of(this.data);
    const displayDataChanges = [
      Observable.of(this.datas),
      this.sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData();
    });
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  getSortedData(): Data[] {
    const data = this.datas.slice();
    if (!this.sort.active || this.sort.direction == '') { return data; }

    return data.sort((a, b) => {

      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.sort.active) {
        case 'id':
          [propertyA, propertyB] = [a['player'].inningsToday, b['player'].inningsToday];
          break;
        case 'pitches':
          [propertyA, propertyB] = [a['stats'].PitchesThrown['#text'], b['stats'].PitchesThrown['#text']];
          break;
        case 'strikeouts':
          [propertyA, propertyB] = [a['stats'].PitcherStrikeouts['#text'], b['stats'].PitcherStrikeouts['#text']];
          break;
        case 'pitcherWalks':
          [propertyA, propertyB] = [a['stats'].PitcherWalks['#text'], b['stats'].PitcherWalks['#text']];
          break;
        case 'inningsPitched':
          [propertyA, propertyB] = [a['stats'].InningsPitched['#text'], b['stats'].InningsPitched['#text']];
          break;
        case 'pitchesPerInning':
          [propertyA, propertyB] = [a['stats'].PitchesPerInning['#text'], b['stats'].PitchesPerInning['#text']];
          break;
        case 'pitcherWildPitches':
          [propertyA, propertyB] = [a['stats'].PitcherWildPitches['#text'], b['stats'].PitcherWildPitches['#text']];
          break;
        case 'pickoffAttempts':
          [propertyA, propertyB] = [a['stats'].PickoffAttempts['#text'], b['stats'].PickoffAttempts['#text']];
          break;

      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
    });

  }

}
