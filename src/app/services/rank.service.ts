import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  public nflRanks: any;
  public teamORank: any;
  public teamDRank: any;
  public updatedRanks: any;

  constructor() {

  }

   public rankOffense(teams, nflTeams, week) {
    let dataO = [];
    let rankO = [];
    let rank2O = [];
    let tRankO = [];
    dataO = teams;

    rankO = dataO.slice().sort((a: any, b: any) => {
      if ((a['stats'].rushing.rushYards + a['stats'].passing.passNetYards
      + (parseInt(week) < 13 && a.bye < parseInt(week) ? 350 : 0))
      >= (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards + (parseInt(week) < 13 && b.bye < parseInt(week) ? 350 : 0))) {
        return -1;
      } else if ((a['stats'].rushing.rushYards + a['stats'].passing.passNetYards
      + (parseInt(week) < 13 && a.bye < parseInt(week) ? 350 : 0))
      <= (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards + (parseInt(week) < 13 && b.bye < parseInt(week) ? 350 : 0))) {
        return 1;
      } else {
        return 0;
      }
  });

  rank2O = dataO.slice().sort((a: any, b: any) => {
    // console.log('rank Sacks and Picks');
    if ((a['stats'].passing.passTD + a['stats'].rushing.rushTD
    + (parseInt(week) < 13 && a.bye < parseInt(week) ? 3 : 0)) 
     >= (b['stats'].passing.passTD + b['stats'].rushing.rushTD + (parseInt(week) < 13 && b.bye < parseInt(week) ? 3 : 0))) {
      return -1;
    } else if ((a['stats'].passing.passTD + a['stats'].rushing.rushTD
    + (parseInt(week) < 13 && a.bye < parseInt(week) ? 3 : 0)) 
     <= (b['stats'].passing.passTD + b['stats'].rushing.rushTD + (parseInt(week) < 13 && b.bye < parseInt(week) ? 3 : 0))) {
      return 1;
    } else {
      return 0;
    }
  });

  rankO.forEach(function(item, index){
    for (let team of nflTeams) {
     if (rankO[index].team.id === team.id) { 
       team.oRank = index + 1;
       team.stats = rankO[index].stats;
     }
    }
  });

  rank2O.forEach(function(item, index){
    for (let team of nflTeams) {
     if (rank2O[index].team.id === team.id) { 
       team.tdRank = index + 1; 
     }
    }
  });

  tRankO = nflTeams.slice().sort((a: any, b: any) => {
    // console.log('rank teams final');
    if (a.oRank + a.tdRank
    <= b.oRank + b.tdRank) {
      return -1;
    } else if (a.oRank + a.tdRank
    >= b.oRank + b.tdRank) {
      return 1;
    } else {
      return 0;
    }
  });
  //console.log('team rank', tRankO);

  tRankO.forEach(function(item, index){
    for (let team of nflTeams) {
      if (tRankO[index].id === team.id) { 
        team.offenseRankLs = index + 1; 
      }
    }
  });

  return nflTeams;
}

   public rankDefense(teams, nflTeams, week) {
      let dataD = [];
      let rankD = [];
      let rank2D = [];
      let tRankD = [];
      dataD = teams;
    
      rankD = dataD.slice().sort((a: any, b: any) => {
        if ((a['stats'].standings.pointsAgainst + 
        (parseInt(week) < 13 && a.bye < parseInt(week) ? 21 : 0)) 
         <= (b['stats'].standings.pointsAgainst + 
         (parseInt(week) < 13 && b.bye < parseInt(week) ? 21 : 0))) {
          return -1;
        } else if ((a['stats'].standings.pointsAgainst + 
        (parseInt(week) < 13 && a.bye < parseInt(week) ? 21 : 0)) 
         >= (b['stats'].standings.pointsAgainst + 
         (parseInt(week) < 13 && b.bye < parseInt(week) ? 21 : 0))) {
          return 1;
        } else {
          return 0;
        }
      });

      rank2D = dataD.slice().sort((a: any, b: any) => {
        // console.log('rank Sacks and Picks');
        if ((a['stats'].tackles.sacks + a['stats'].interceptions.interceptions + a['stats'].interceptions.passesDefended 
        + (parseInt(week) < 13 && a.bye < parseInt(week) ? 7 : 0))
         >= (b['stats'].tackles.sacks + b['stats'].interceptions.interceptions + b['stats'].interceptions.passesDefended 
         + (parseInt(week) < 13 && b.bye < parseInt(week) ? 7 : 0))) {
          return -1;
        } else if ((a['stats'].tackles.sacks + a['stats'].interceptions.interceptions + a['stats'].interceptions.passesDefended 
        + (parseInt(week) < 13 && a.bye < parseInt(week) ? 7 : 0))
         <= (b['stats'].tackles.sacks + b['stats'].interceptions.interceptions + b['stats'].interceptions.passesDefended 
         + (parseInt(week) < 13 && b.bye < parseInt(week) ? 7 : 0))) {
          return 1;
        } else {
          return 0;
        }
      });

      rankD.forEach(function(item, index){
        for (let team of nflTeams) {
         if (rankD[index].team.id === team.id) { 
           team.dRank = index + 1;
           team.stats = rankD[index].stats;
         }
        }
      });

      rank2D.forEach(function(item, index){
        for (let team of nflTeams) {
         if (rank2D[index].team.id === team.id) { 
           team.sackRank = index + 1; 
         }
        }
      });

      tRankD = nflTeams.slice().sort((a: any, b: any) => {
        // console.log('rank teams final');
        if ((a.dRank + a.sackRank)
        <= (b.dRank + b.sackRank)) {
          return -1;
        } else if ((a.dRank + a.sackRank)
        >= (b.dRank + b.sackRank)) {
          return 1;
        } else {
          return 0;
        }
      });
      
      //console.log('team rank D', tRankD);
      tRankD.forEach(function(item, index){
        for (let team of nflTeams) {
          if (tRankD[index].id === team.id) { 
            team.defenseRankLs = index + 1; 
          }
        }
      });

      return nflTeams;
  }

}
