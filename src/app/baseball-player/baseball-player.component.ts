import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import { DataService } from '../data.service';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Location } from '@angular/common';

let headers = null;
let options = null;


@Component({
  selector: 'app-baseball-player',
  templateUrl: './baseball-player.component.html',
  styleUrls: ['./baseball-player.component.css']
})
export class BaseballPlayerComponent implements OnInit {

  players: Array<any>;
  game: Array<any>;
  playByPlay: Array<any>;
  currentInningAtBatPlays: Array<any> = [];
  playerId: string = '';
  teamAtBat: string = '';
  currentPitcher: string = '';
  currentPitchResult: string = '';
  currentPitcherArm: string = '';
  currentPitchSpeed: string = '';
  currentPitcherId: string = '';
  currentHitResult: string = '';
  currentHitStance: string = '';
  currentHitter: string = '';
  homerunHitter: string = ''
  homerunPitcher: string = '';
  lastHomerun: string = '';
  selectedPlayer: Observable<any>;
  gameId: Observable<any>;
  defineToken: string = '';

  //IF REFRESH VARS
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
  specificFastballDataById: Array < any > = [];
  speedResults: Array < any > = [];
  startersData: Array < any > = [];
  loading: boolean = true;
  live: boolean = false;
  gamesToday: boolean = false;
  noGamesToday: boolean = false;
  selected: any;
  scrollHeight: any;
  scrollTop: any;
  stat: string = '';
  
  

  constructor(private route: ActivatedRoute, private dataService: DataService, public router: Router, public location: Location, private http: HttpClient, private firebaseService: FirebaseService) {}
  loadId() {
    this.playerId = this.route.params['_value'].id;
    console.log(this.dataService.getAllSentStats(), ' get all SentStats....');
    // TODO: IF ON REFRESH THIS RETURNS NULL THEN RUN ALL DATA CALLS AGAIN 
    this.players = this.dataService.getAllSentStats();


    if (this.players != null) {
      for (let player of this.players) { 
       if (player.player.ID === this.playerId) {
         console.log(player, 'this is the selected player');
         this.selectedPlayer = player;
         this.gameId = player.team.gameId;

       }
    }
         this.dataService.getEnv().subscribe(res => {
        
        //headers = new HttpHeaders().set("Authorization", "Basic " + btoa('ianposton' + ":" + res));
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(res + ":" + 'MYSPORTSFEEDS'));
         //this.dataService
          //.sendHeaderOptions(headers, options);
           this.loadData();
      })
        this.loading = false;
    
    } else {
      //call everything again and show spinner until this.players = this.dataService.getAllSentStats(); this is no longer null

     
         this.dataService.getEnv().subscribe(res => {
        
       //headers = new HttpHeaders().set("Authorization", "Basic " + btoa('ianposton' + ":" + res));
       headers = new HttpHeaders().set("Authorization", "Basic " + btoa(res + ":" + 'MYSPORTSFEEDS'));
         this.dataService
          .sendHeaderOptions(headers);
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
                    this.http.get('https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/game_startinglineup.json?gameid=' + g.id + '&position=P', {headers})
                   
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
                      } else {
                        //console.log(res2[i2].expected.starter[0].player.ID, 'got player ID!');
                        this.starterIdData.push(res2[i2].expected.starter[0].player.ID);
                        //console.log(this.starterIdData, 'this array has ALL the IDs of todays starters');
                      }

                    });
                  });

                });
            }

            this.loadDataRefresh();


          })
           
      })
 
    this.firebaseService
      .getData()
      .subscribe(x => {
        console.log(x, 'got response from firebase...');
        //this.loadData();
        this.fastballData = x;
      });

     } // end of refresh else
    
  }

  loadDataRefresh() {

    if (this.gamesToday === true) {
      this.dataService
        .getDaily().subscribe(res => {
          console.log(res, "Daily stats...");
          this.dailyStats = res['dailyplayerstats'].playerstatsentry;
        })
      this.dataService
        .getScore('data').subscribe(res => {
          console.log(res['scoreboard'].gameScore, 'Score...');
          this.score = res['scoreboard'].gameScore;
        })
    } else {
      console.log('No games then no daily stats either. :(');
    }


    this.dataService
      .getInfo().subscribe(res => {
        console.log(res, 'got player info res from cache I think!');
        this.playerInfo = res['activeplayers'].playerentry;
      });

    //THESE FUNCTIONS GET PLAYER INFO AND CREATE CUSTOM PLAYER VALUES BARROWED FROM SEPARATE API CALL
    this.dataService
      .getAllStats().subscribe(res => {
        console.log(res, 'got res!');

        this.myData = res['cumulativeplayerstats'].playerstatsentry;

        if (this.starterIdData.length > 0 || this.noGamesToday === true) {

          if (this.myData && this.starterIdData && this.gamesToday === true) {
            console.log('start sorting data for starters...');
            for (let startid of this.starterIdData) {

              for (let startdata of this.myData) {

                if (startid === startdata.player.ID) {
                  startdata.player.startingToday = true;
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

                }
                if (schedule.homeTeam.Name === sdata.team.Name) {
                  sdata.player.gameTime = schedule.time;
                  sdata.team.gameField = schedule.location;
                  sdata.team.gameId = schedule.id;
                  sdata.player.gameLocation = "home";
                  sdata.team.opponent = schedule.awayTeam.City + ' ' + schedule.awayTeam.Name;
                  sdata.team.opponentCity = schedule.awayTeam.City;
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
                  data.player.city = info.player.BirthCity;
                  data.player.country = info.player.BirthCountry;
                  data.player.Height = info.player.Height;
                  data.player.Weight = info.player.Weight;
                  data.player.IsRookie = info.player.IsRookie;
                  if (data.player.inningsToday == null) {
                    data.player.inningsToday = '0';
                  }

                  //STAT-DATA IS CALLED IN THE HTML
                  this.statData = this.myData;


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

            //THIS FOR LOOP GETS HOME STARTING HOCKEY GOALIES AND THERE STARTING OPPONENT 
            this.startersData.forEach((data) => {

              data.team.matchup = this.matchupData[data.team.gameId];
              //console.log(this.matchupData[data.team.gameId], 'show this');

            })

            this.dataService
              .sendAllStats(this.statData);
              this.loadId();

          }
        }

       

        this.loading = false;
      });


  }

  loadIdNext(id) {
    this.playerId = id;
    console.log(this.dataService.getAllSentStats(), 'getAllSentStats....');
    this.players = this.dataService.getAllSentStats();

    for (let player of this.players) { 
       if (player.player.ID === this.playerId) {
         console.log(player, 'this is the selected player');
         this.selectedPlayer = player;
         this.gameId = player.team.gameId;

       } else {
         //snackBar here to say the pitcher ID is not in the array
         // pitching stats for this player are not available. 
         console.log('this player ID is not available...')
       }
    }

     this.dataService.getEnv().subscribe(res => {
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa('ianposton' + ":" + res));
        this.loadData();
      })
  }
 
 loadData(){
   let url6 = 'https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/game_playbyplay.json?gameid='+this.gameId;
      console.log('getting play-by-play for this game from API...');
      this.http.get(url6, {headers})
       
        .subscribe(res => {
        console.log(res['gameplaybyplay'].atBats.atBat, 'got response for play by play...');
        this.game = res['gameplaybyplay'].game;
        this.playByPlay = res['gameplaybyplay'].atBats.atBat;
        this.getPlays();
        });

         
          
 }

 getPlays() {
    if (this.players && this.playByPlay) {
            console.log('start sorting data for scoreboard stats...');
            for (let pbp of this.playByPlay) {
              for (let pdata of this.players) {

                 pbp.atBatPlay.forEach((item, index) => {
                     
                     // if(item.batterUp != null ) {
                     //   if(item.batterUp.result === 'SINGLE') {
                     //     console.log(item, 'looking for singles by hitter'); 
                     //   this.homerunHitter = item.batterUp.battingPlayer.FirstName + ' ' + item.batterUp.battingPlayer.LastName;
                     //   this.lastHomerun = item.batterUp.result;
                     //   }
                       
                      
                     // }
                     // if(item.pitch != null ) {
                     //   if (item.pitch.result === 'SINGLE') {
                     //     console.log(item, 'looking for singles by pitcher'); 
                     //   this.homerunPitcher = item.pitch.pitchingPlayer.FirstName + ' ' + item.pitch.pitchingPlayer.LastName;
                     //   this.lastHomerun = item.pitch.result;
                     //   }
                       
                       
                     // }
                   })
                
               // if (this.game['awayTeam'].Abbreviation === pdata.team.Abbreviation) {
                  //get score for home and away
                  //console.log(pbp.inning + ' ' + pdata.team.currentInning + ' ' + pbp.inningHalf + ' ' + pdata.team.currentInningHalf, 'current inning');
                 if (pbp.inning === pdata.team.currentInning && pbp.inningHalf ===  pdata.team.currentInningHalf) {
                   //whats happening with pbp?
                   //console.log(pbp, 'current inning');
                   this.teamAtBat = pbp.battingTeam.City + " " + pbp.battingTeam.Name;

                   pbp.atBatPlay.forEach((item, index) => {
                     //console.log(item, 'at bat plays for away team');
                     if(item.batterUp != null) { 
                       //this.currentInningAtBatPlays.push(item);
                       this.currentHitter = item.batterUp.battingPlayer.FirstName + ' ' + item.batterUp.battingPlayer.LastName;
                       this.currentHitResult = item.batterUp.result;
                       this.currentHitStance = item.batterUp.standingLeftOrRight;
                     }
                     if(item.pitch != null) {
                       this.currentPitcherId = item.pitch.pitchingPlayer.ID
                       this.currentPitcher = item.pitch.pitchingPlayer.FirstName + ' ' + item.pitch.pitchingPlayer.LastName;
                       this.currentPitchResult = item.pitch.result;
                       this.currentPitcherArm = item.pitch.throwingLeftOrRight;
                       this.currentPitchSpeed = item.pitch.ballStartSpeed;
                     }
                   })
                 }
                  
           

                }
              }
            }
 }

  ngOnInit() {

    this.loadId();
    
  }

  
  

  public goBack() {
    this.router.navigateByUrl('/pitching-stats');
  }

  public goToThisPitcher(id) {
    this.router.navigateByUrl('/daily-stats/'+id);
    this.loadIdNext(id);

  }

}