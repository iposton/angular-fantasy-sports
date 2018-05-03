import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TomorrowService } from '../tomorrow.service';
import { NhlDataService } from '../nhl-data.service';
import { FirebaseService } from '../firebase.service';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

//DATE FORMAT FOR FULL SCHEDULE API COMPARE DATES FOR BACK TO BACK
let today = null;
let tomorrow = null;
let yesterday = null;
let dailyTeams = [];
let teamString = '';

let headers = null;


@Component({
  selector: 'app-tomorrow-results',
  templateUrl: './tomorrow-results.component.html',
  styleUrls: ['./tomorrow-results.component.css']
})
export class TomorrowResultsComponent implements OnInit {

  starters: Array < any > ;
  dailySchedule: Array < any > ;
  fullSchedule: Array < any > ;
  starterIdData: Array < any > = [];
  startersData: Array < any > = [];
  myData: Array < any > ;
  showDataTomorrow: Array < any > ;
  sentDataTomorrow: Array < any > ;
  sentDataToday: Array < any > ;
  gameDate: string = '';
  defineToken: string = '';
  statData: Array < any > = [];
  playerInfo: Array < any > ;
  playerInjuries: Array < any > ;
  noGamesToday: boolean;
  gamesToday: boolean;
  twitterHandles: Array < any > ;
  tomorrowStarters: Array < any > ;
  tweetDay: any;
  noGamesMsg: any;
  selected: any;
  startersDate: any;
  loading: boolean = true;
  fullFirebaseResponse: any;
  apiRoot: string = "https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-playoff";

  constructor(private http: HttpClient, private tomorrowService: TomorrowService, private todayService: NhlDataService, private fbService: FirebaseService, public snackBar: MatSnackBar, public router: Router, public dialog: MatDialog) {

      this.fbService
      .getStarterData()
      .subscribe(res => {
      if (res[0] != null) {
        this.fullFirebaseResponse = res[0];
        console.log(res[0][1], 'got response from firebase...');
        this.startersDate = res[0][2]['tomorrowDate'];
        this.tomorrowStarters = res[0][3];
         // This is to change a goalie in view without refresh
         if(this.showDataTomorrow != null && this.myData != null) {

             for (let show of this.showDataTomorrow) {
              for (let rep of this.myData) {
            
                if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[0].player.ID] != null && this.fullFirebaseResponse[3][rep.player.ID] != null && rep.team.ID === show.team.matchup[0].team.ID && this.fullFirebaseResponse[3][show.team.matchup[0].player.ID].probable === false && this.fullFirebaseResponse[3][rep.player.ID].confirmed === true ) {
                    // Found all confirmed goalies
                    // if any of these confirmed goalies don't match ID's then check if same team id and swap 
                   console.log(rep, 'update me into the view right now!');
                   console.log(show.team.matchup[0], 'I have been changed, replace me with new goalie...');
                   show.team.matchup[0] = rep; 
                } else if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[0].player.ID] != null && this.fullFirebaseResponse[3][rep.player.ID] != null && rep.team.ID === show.team.matchup[0].team.ID && this.fullFirebaseResponse[3][show.team.matchup[0].player.ID].probable === false && this.fullFirebaseResponse[3][rep.player.ID].confirmed === false && this.fullFirebaseResponse[3][rep.player.ID].probable === true && rep.player.probable === false) {
                  rep.player.probable = true;
                  console.log(rep, 'update me into the view right now! I am probable to start.');
                  console.log(show.team.matchup[0], 'I have been changed, replace me with probable goalie.');
                  show.team.matchup[0] = rep;
                }
                if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[1].player.ID] != null && this.fullFirebaseResponse[3][rep.player.ID] != null && rep.team.ID === show.team.matchup[1].team.ID && this.fullFirebaseResponse[3][show.team.matchup[1].player.ID].probable === false && this.fullFirebaseResponse[3][rep.player.ID].confirmed === true ) {
                    // Found all confirmed goalies
                    // if any of these confirmed goalies don't match ID's then check if same team id and swap 
                   console.log(rep, 'update me into the view right now!');
                   console.log(show.team.matchup[1], 'I have been changed, replace me with new goalie...');
                   show.team.matchup[1] = rep; 
                } else if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[1].player.ID] != null && this.fullFirebaseResponse[3][rep.player.ID] != null && rep.team.ID === show.team.matchup[1].team.ID && this.fullFirebaseResponse[3][show.team.matchup[1].player.ID].probable === false && this.fullFirebaseResponse[3][rep.player.ID].confirmed === false && this.fullFirebaseResponse[3][rep.player.ID].probable === true && rep.player.probable === false) {
                  rep.player.probable = true;
                  console.log(rep, 'update me into the view right now! I am probable to start.');
                  console.log(show.team.matchup[1], 'I have been changed, replace me with probable goalie.');
                  show.team.matchup[1] = rep;
                }
              }
             }

         }   
        
      }


       
      });
    yesterday = this.tomorrowService.getYesterday();
    tomorrow = this.tomorrowService.getTomorrow();
    today = this.tomorrowService.getToday();
    console.log(yesterday + ' yesterday, ' + today + ' today, ' + tomorrow + ' tomorrow, ');
    this.sentDataTomorrow = this.tomorrowService.getSentStats();
    this.sentDataToday = this.todayService.getSentStats();
  }


    public updateShowData() {
    for (let show of this.showDataTomorrow) {
      for (let rep of this.myData) {
      

        if (show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[0].player.ID] != null && this.fullFirebaseResponse[3][rep.player.ID] != null && rep.team.ID === show.team.matchup[0].team.ID && this.fullFirebaseResponse[3][show.team.matchup[0].player.ID].probable === false && this.fullFirebaseResponse[3][rep.player.ID].confirmed === true ) {
            // Found all confirmed goalies
            // if any of these confirmed goalies don't match ID's then check if same team id and swap 
           console.log(rep, 'update me into the view right now!');
           console.log(show.team.matchup[0], 'I have been changed, replace me with new goalie...');
           show.team.matchup[0] = rep; 
        }
        if (show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[1].player.ID] != null && this.fullFirebaseResponse[3][rep.player.ID] != null && rep.team.ID === show.team.matchup[1].team.ID && this.fullFirebaseResponse[3][show.team.matchup[1].player.ID].probable === false && this.fullFirebaseResponse[3][rep.player.ID].confirmed === true ) {
            // Found all confirmed goalies
            // if any of these confirmed goalies don't match ID's then check if same team id and swap 
           console.log(rep, 'update me into the view right now!');
           console.log(show.team.matchup[1], 'I have been changed, replace me with new goalie...');
           show.team.matchup[1] = rep; 
        }
      }
    }
  }

  loadData() {

    this.tomorrowService
      .getEnv().subscribe(res => {
        
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa('ianposton' + ":" + res));
   
        this.tomorrowService
          .sendHeaderOptions(headers);

        this.tomorrowService
          .getDailySchedule().subscribe(res => {

            console.log(res, "schedule...");

            if (res['dailygameschedule'].gameentry == null) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "No Games Scheduled Tomorrow :("
              console.log('There are no games being played today.');
            } else {

              let postponed;

              res['dailygameschedule'].gameentry.forEach((item, index) => {

                 
                dailyTeams.push(item.homeTeam.Abbreviation, item.awayTeam.Abbreviation); 
                teamString = dailyTeams.join();
                
                // postponed = index;
                // if (res['dailygameschedule'].gameentry[postponed].id === '41392') {
                //   console.log(res['dailygameschedule'].gameentry[postponed], "hi, iam postponed and causing trouble...");
                //   res['dailygameschedule'].gameentry.splice(postponed, 1);
                // }
              });

              this.gamesToday = true;
              this.dailySchedule = res['dailygameschedule'].gameentry;
              this.gameDate = res['dailygameschedule'].gameentry[0].date;

              let dPipe = new DatePipe("en-US");
              this.tweetDay = dPipe.transform(this.gameDate, 'EEEE');

              Observable.forkJoin(
                  res['dailygameschedule'].gameentry.map(
                    g =>
                    this.http.get(`${this.apiRoot}/game_startinglineup.json?gameid=` + g.id + `&position=Goalie-starter`, {headers})
                    
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
                    res2 = res[i]['gamestartinglineup'].teamLineup;
                    //this.gameTime =  res[i]['gamestartinglineup'].game.date;
                    res2.forEach((item, index) => {

                      i2 = index;
                      if (res2[i2].actual != null && res2[i2].expected != null) {
                        //console.log(res2[i2].actual.starter[0].player.ID, 'got player ID for goalie actualy starting!');
                        this.starterIdData.push(res2[i2].actual.starter[0].player.ID);

                      } else if (res2[i2].actual == null && res2[i2].expected != null) {
                        //console.log(res2[i2].expected.starter[0].player.ID, 'got player ID for goalie expected to start!');
                        this.starterIdData.push(res2[i2].expected.starter[0].player.ID);
                      } else {
                        //console.log(res2[i2].team.City + " " + res2[i2].team.Name, 'no starters yet!');
                        this.starterIdData.push(res2[i2].team.ID);
                        //this.starterIdData.push(res2[i2].expected.starter[0].player.ID);
                        //console.log(this.starterIdData, 'this array has ALL the IDs of todays starters');

                      }

                    });
                  });

                  this.sortData();

                });

            }

          })

        this.tomorrowService
          .getInjured().subscribe(res => {
            console.log(res['playerinjuries'].playerentry, "injured players...");
            this.playerInjuries = res['playerinjuries'].playerentry;
          })

        // this.tomorrowService
        //   .getInfo().subscribe(res => {
        //     console.log(res['activeplayers'].playerentry, "active players stats...");
        //     this.playerInfo = res['activeplayers'].playerentry;
        //   })

        this.tomorrowService
          .getGameId().subscribe(res => {
            console.log(res['fullgameschedule'].gameentry, "scheduled games for yesterday today and tomorrow...");

            //this removed a postponed game from api to avoid errors
          //   if (res['fullgameschedule'].gameentry > 0) {
          //   let postponed;
          //   res['fullgameschedule'].gameentry.forEach((item, index) => {
          //     postponed = index;
          //     if (res['fullgameschedule'].gameentry[postponed].id === '41392') {
          //       console.log(res['fullgameschedule'].gameentry[postponed], "hi, iam postponed and causing trouble...");
          //       res['fullgameschedule'].gameentry.splice(postponed, 1);
          //     }
          //   });
          // }

            this.fullSchedule = res['fullgameschedule'].gameentry;
          })

      })

  }

  sortData() {

    this.tomorrowService
      .getStats(teamString).subscribe(res => {
        console.log(res['cumulativeplayerstats'].playerstatsentry, "cumulative stats...");
        this.myData = res['cumulativeplayerstats'].playerstatsentry;

        if (this.myData && this.dailySchedule) {
          console.log('start sorting data for daily schedule...');
          for (let schedule of this.dailySchedule) {

            for (let sdata of this.myData) {

              if (schedule.awayTeam.Name === sdata.team.Name) {
                sdata.player.gameTime = schedule.time;

                if (schedule.location === 'Nassau Coliseum') {
                  sdata.team.gameIce = 'Barclays Center';
                } else if (schedule.location === 'Verizon Center') {
                  sdata.team.gameIce = 'Capital One Arena';
                } else if (schedule.location === 'Joe Louis Arena') {
                  sdata.team.gameIce = 'Little Caesars Arena';
                } else if (schedule.location === 'Consol Energy Center') {
                  sdata.team.gameIce = 'PPG Paints Arena';
                } else {
                  sdata.team.gameIce = schedule.location;
                }

                sdata.team.gameId = schedule.id;
                sdata.player.gameLocation = "away";
                sdata.team.opponent = schedule.homeTeam.City + ' ' + schedule.homeTeam.Name;
                sdata.team.opponentId = schedule.homeTeam.ID;
                sdata.team.opponentCity = schedule.homeTeam.City;
                sdata.team.opponentName = schedule.homeTeam.Name;
                sdata.team.today = today;
                sdata.team.tomorrow = tomorrow;
                sdata.team.yesterday = yesterday;
                sdata.team.day = this.tweetDay;
                sdata.player.injured = false;
                sdata.player.injury = '';
                sdata.player.playedYesterday = false;
                sdata.player.savesYesterday = '0';
                sdata.player.winsYesterday = '0';
                sdata.player.lossesYesterday = '0';
                sdata.player.saYesterday = '0';
                sdata.player.olYesterday = '0';
                sdata.player.shYesterday = '0';


              }
              if (schedule.homeTeam.Name === sdata.team.Name) {
                sdata.player.gameTime = schedule.time;

                if (schedule.location === 'Nassau Coliseum') {
                  sdata.team.gameIce = 'Barclays Center';
                } else if (schedule.location === 'Verizon Center') {
                  sdata.team.gameIce = 'Capital One Arena';
                } else if (schedule.location === 'Joe Louis Arena') {
                  sdata.team.gameIce = 'Little Caesars Arena';
                } else if (schedule.location === 'Consol Energy Center') {
                  sdata.team.gameIce = 'PPG Paints Arena';
                } else {
                  sdata.team.gameIce = schedule.location;
                }

                sdata.team.gameId = schedule.id;
                sdata.player.gameLocation = "home";
                sdata.team.opponent = schedule.awayTeam.City + ' ' + schedule.awayTeam.Name;
                sdata.team.opponentId = schedule.awayTeam.ID;
                sdata.team.opponentCity = schedule.awayTeam.City;
                sdata.team.opponentName = schedule.awayTeam.Name;
                sdata.team.today = today;
                sdata.team.tomorrow = tomorrow;
                sdata.team.yesterday = yesterday;
                sdata.team.day = this.tweetDay;
                sdata.player.injured = false;
                sdata.player.injury = '';
                sdata.player.playedYesterday = false;
                sdata.player.savesYesterday = '0';
                sdata.player.winsYesterday = '0';
                sdata.player.lossesYesterday = '0';
                sdata.player.saYesterday = '0';
                sdata.player.olYesterday = '0';
                sdata.player.shYesterday = '0';
              }
            }
          }
        }

        if (this.myData && this.fullSchedule) {
          console.log('start sorting data for full schedule...');
          for (let full of this.fullSchedule) {

            for (let btb of this.myData) {

              if (full.awayTeam.ID === btb.team.ID) {

                if (btb.team.yesterday === full.date) {

                  btb.team.hadGameYesterday = true;

                }
                if (btb.team.today === full.date) {
                  btb.team.haveGameToday = true;
                }


                if (btb.team.tomorrow === full.date) {

                  btb.team.haveGameTomorrow = true;
                }

              }
              if (full.homeTeam.ID === btb.team.ID) {


                if (btb.team.yesterday === full.date) {

                  btb.team.hadGameYesterday = true;


                }
                if (btb.team.today === full.date) {
                  btb.team.haveGameToday = true;
                }


                if (btb.team.tomorrow === full.date) {

                  btb.team.haveGameTomorrow = true;
                }

              }
            }
          }
        }


        
          for (let data of this.myData) {
              console.log('start sorting data for goalie images...');

             data.player.savePercent = data.stats.stats.SavePercentage['#text'].slice(1);


              if ( this.tomorrowStarters[data.player.ID] != null) {
                   data.player.image = this.tomorrowStarters[data.player.ID].image;
                   data.player.atHandle = this.tomorrowStarters[data.player.ID].atHandle;
                   data.player.twitterHandle = this.tomorrowStarters[data.player.ID].twitterHandle;
                } 

              if (this.tomorrowStarters[data.player.ID] != null && this.startersDate === data.team.today && this.tomorrowStarters[data.player.ID].probable === true) {
                 
                

                data.player.startingToday = false;
                data.player.likelyStartingToday = true;
                data.player.confirmed = this.tomorrowStarters[data.player.ID].confirmed;
                data.player.probable = this.tomorrowStarters[data.player.ID].probable;
                this.startersData.push(data);

              }

              if (data.team.hadGameYesterday === true) {
                //console.log(data, 'game yesterday');
                if (data.team.haveGameToday === true) {
                  data.team.secondBacktoBack = " 2nd game of Back-to-Back ";
                } else {
                  data.team.secondBacktoBack = "";
                }
              } else {
                data.team.secondBacktoBack = "";
              }

              if (data.team.haveGameToday === true) {
                //console.log(data, 'game today');
                if (data.team.haveGameTomorrow === true) {
                  data.team.firstBacktoBack = " 1st game of Back-to-Back ";
                } else {
                  data.team.firstBacktoBack = "";
                }
              }     

          }
        

        if (this.sentDataToday != null) {
          console.log('start sorting data from yesterday...');
          for (let today of this.sentDataToday) {

            for (let tomdata of this.myData) {

              if (today.player.saves > 1 && today.player.ID === tomdata.player.ID) {

                tomdata.player.finishedYesterday = false;
                tomdata.player.playedYesterday = true;
                tomdata.player.savesYesterday = today.player.saves;
                tomdata.player.winsYesterday = today.player.wins;
                tomdata.player.lossesYesterday = today.player.losses;
                tomdata.player.saYesterday = today.player.shotsFaced;
                tomdata.player.olYesterday = today.player.OvertimeLosses;
                tomdata.player.shYesterday = today.player.Shutouts;
                if (today.player.wins == '1') {
                  tomdata.player.resultYesterday = today.player.FirstName + ' ' + today.player.LastName + ' got the Win tonight with ' + today.player.saves + ' saves against ' + today.player.shotsFaced + ' shots.'
                } else if (today.player.losses == '1' || today.player.OvertimeLosses == '1') {
                  tomdata.player.resultYesterday = today.player.FirstName + ' ' + today.player.LastName + ' got the Loss tonight with ' + today.player.saves + ' saves against ' + today.player.shotsFaced + ' shots.'
                }

              }

            }
          }
        }

       if (this.playerInjuries && this.myData) {
          console.log('start sorting data for starters matchups...');
          for (let inj of this.playerInjuries) {

            for (let injdata of this.myData) {

              if (inj.player.ID === injdata.player.ID) {
                //console.log(inj.injury, "injuries...");

                injdata.player.injured = true;
                injdata.player.injury = ' ' + inj.injury;

                if (inj.injury.substr(inj.injury.length - 5) === '(Out)') {
                  console.log(inj.injury.substr(inj.injury.length - 5), 'injuries that say OUT!');
                  injdata.player.injuryOut = true;
                }

              }

            }
          }
        }



        if (this.myData && this.gamesToday === true) {

          if (this.starterIdData.length > 0) {
            console.log('start sorting data for starters matchups...');
            for (let startid of this.starterIdData) {

              for (let startdata of this.myData) {

                if (startid === startdata.team.ID) {
                  //4449 Jeff Glass is blocked //9072 Lindgren //11721 Lagace //Sateri 13871 //Brossoit 5552 //8952 Wedgewood //9072 Lindgren //13873 DeSmith //10083 Jarry //Lyon 13662
                  if (this.startersDate != startdata.team.today && startdata.stats.GamesPlayed['#text'] > 1 && startdata.player.injuryOut == null && startdata.player.ID != '11721' && startdata.player.ID != '13871' && startdata.player.ID != '4449' && startdata.player.ID != '5552' && startdata.player.ID != '8952' && startdata.player.ID != '9072' && startdata.player.ID != '10083' && startdata.player.ID != '13662') {
              
                    startdata.player.startingToday = false;
                    startdata.player.likelyStartingToday = true;
                    //console.log(startdata.player.FirstName + " " + startdata.player.LastName, "this goalie is not starting yet. but he might start.");
                    this.startersData.push(startdata);


                  }
                } else if (startid === startdata.player.ID) {
                  startdata.player.startingToday = true;
                  //console.log(startdata, 'player data');
                  this.startersData.push(startdata);

                }

              }
            }
          }


          //MAKE MATCHUPS BY GAME ID OF STARTERS AND NON STARTERS
          if (this.startersData.length > 0) {
            this.statData = this.startersData.reduce(function(r, a) {
              r[a.team.gameId] = r[a.team.gameId] || [];

              r[a.team.gameId].push(a);
              return r

            }, Object.create(null));

            //console.log(this.statData, 'made matchups of starting goalies by game ID...');

            this.showMatchups();
          }

        }

      })

  }

  showMatchups() {

   console.log(this.statData, 'show this');
    //THIS FOR LOOP GETS HOME STARTING HOCKEY GOALIES AND THERE STARTING OPPONENT 
    this.startersData.forEach((data) => {
      if (data.player.gameLocation === 'home') {
        data.team.matchup = this.statData[data.team.gameId];
        
        this.statData[data.team.gameId][0].player.twoPossibleStarters = false;
        this.statData[data.team.gameId][1].player.twoPossibleStarters = false;

        if (this.statData[data.team.gameId].length > 2) {
          //console.log(this.statData[data.team.gameId][0].team.Name + ' ' + this.statData[data.team.gameId][1].team.Name + ' ' + this.statData[data.team.gameId][2].team.Name, 'possible starters...');
          if (this.statData[data.team.gameId][0].team.ID === this.statData[data.team.gameId][1].team.ID) {
            this.statData[data.team.gameId][1].twoPossibleStarters = true;
            if (this.statData[data.team.gameId][0].player.resultYesterday != null) {
              this.statData[data.team.gameId][0].player.finishedYesterday = true;
            }
            if (this.statData[data.team.gameId][1].player.resultYesterday != null) {
              this.statData[data.team.gameId][1].player.finishedYesterday = true;
            }
          } else {
            this.statData[data.team.gameId][1].twoPossibleStarters = false;
          }
          if (this.statData[data.team.gameId][1].team.ID === this.statData[data.team.gameId][2].team.ID) {
            this.statData[data.team.gameId][1].twoPossibleStarters = true;


            this.statData[data.team.gameId][2].player.twoPossibleStarters = true;
            if (this.statData[data.team.gameId][2].player.resultYesterday != null) {
              this.statData[data.team.gameId][2].player.finishedYesterday = true;
            }
            if (this.statData[data.team.gameId][1].player.resultYesterday != null) {
              this.statData[data.team.gameId][1].player.finishedYesterday = true;
            }
          } else {
            // this.statData[data.team.gameId][1].twoPossibleStarters = false;
            this.statData[data.team.gameId][2].player.twoPossibleStarters = false;
          }
          if (this.statData[data.team.gameId][3] != null) {
            if (this.statData[data.team.gameId][2].team.ID === this.statData[data.team.gameId][3].team.ID) {
              this.statData[data.team.gameId][2].twoPossibleStarters = true;
              this.statData[data.team.gameId][3].twoPossibleStarters = true;
              if (this.statData[data.team.gameId][2].player.resultYesterday != null) {
                this.statData[data.team.gameId][2].player.finishedYesterday = true;
              }
              if (this.statData[data.team.gameId][3].player.resultYesterday != null) {
                this.statData[data.team.gameId][3].player.finishedYesterday = true;
              }
            } else {
              this.statData[data.team.gameId][2].twoPossibleStarters = false;
              this.statData[data.team.gameId][3].twoPossibleStarters = false;
            }
          }

        }


        this.loading = false;
        this.showDataTomorrow = this.startersData;


      }

    })

    this.tomorrowService
      .sendStats(this.showDataTomorrow);
  }

  ngOnInit() {
    if (this.sentDataTomorrow === undefined) {
      this.loadData();

    } else {
        this.loading = false;  
        this.showDataTomorrow = this.sentDataTomorrow;
        this.gameDate = this.showDataTomorrow["0"].team.today;
        
    }

  }

  public isVisibleOnDesktop() {
    // console.log('width over 600px');
  }

  openSnackBar() {
    this.snackBar.openFromComponent(InfoTomorrow, {
      // duration: 500,
    });
  }


  public open(event, data) {
    this.selected = data;
    console.log(data, 'ok you clicked on player img...');
    this.dialog.open(TomorrowDialog, {
      data: data,
      width: '600px',
    });
  }


}

@Component({
  selector: 'tomorrow-dialog',
  template: `<i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
  <span style="color:#00aced;">Twitter Updates!</span> 
  <mat-dialog-content>
  <span style="font-size: 26px; font-weight: light; color: #555; text-align: center;">{{ noPosts }}</span>
  <ul *ngFor="let item of tweetsData" style="font-size:14px">
    <li>{{item.text}} <span style="color:#6740B4; font-weight: bold;">{{item.created_at | date:'fullDate'}}</span></li>
</ul>
</mat-dialog-content>`,
})

export class TomorrowDialog implements OnInit {
  test: any;
  noPosts: any;
  tweetsData: any;
  constructor(public dialogRef: MatDialogRef < TomorrowDialog > , @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

  }

 loadStuff() {
    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('/authorize', {headers}).subscribe((res) => {
      this.searchCall();
    })


  }


  searchCall() {
    console.log(this.data, 'data passed in');

    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');
    //let searchterm = 'query=#startingGoalies #nhl ' + this.data.player.FirstName + ' ' + this.data.player.LastName;
    let searchterm = 'query=' + this.data.player.LastName + ' ' + this.data.player.twitterHandle;


    this.http.post('/search', searchterm, {headers}).subscribe((res) => {
       console.log(res['data'].statuses, 'twitter stuff');
      this.tweetsData = res['data'].statuses;
      if (this.tweetsData.length === 0) {
        this.noPosts = "No Tweets.";
      }
    });
  }
  ngOnInit() {
    this.loadStuff();
  }
}

@Component({
  selector: 'info-tomorrow',
  template: `<i (click)="close()" class="material-icons close">close</i><br />
<span style="color: #e74c3c;">back</span><span style="color: #ccc;"> to back</span><span> = The first game of a back to back scheduled game.</span><br />
<span style="color: #ccc;">back to </span><span style="color: #e74c3c;">back</span><span> = The second game of a back to back scheduled game.</span> <br />
<span>Click on player image for twitter updates!</span>`,
  styles: [`.close { float:right; cursor:pointer; font-size: 20px;}`]
})

export class InfoTomorrow {
  constructor(public snackBar: MatSnackBar) {}
  close() {
    this.snackBar.dismiss();
  }
}
