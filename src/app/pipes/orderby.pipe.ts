import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {
 

transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (field === 'mlb') {
        if (a['gameId'] <= b['gameId']) {
          return -1;
        } else if (a['gameId'] >= b['gameId']) {
          return 1;
        } else {
          return 0;
        }
      } else if (field === 'nfl') {
          if (a.offensePlayers[0].playerObj['gameId'] <= b.offensePlayers[0].playerObj['gameId']) {
            return -1;
          } else if (a.offensePlayers[0].playerObj['gameId'] >= b.offensePlayers[0].playerObj['gameId']) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nba') {
          if ((a['starterInfo'] && a['starterInfo'].status != 'UNPLAYED' ? a['player'].pts : a['stats'].offense.ptsPerGame) >= (b['starterInfo'] && b['starterInfo'].status != 'UNPLAYED' ? b['player'].pts : b['stats'].offense.ptsPerGame)) {
            return -1;
          } else if ((a['starterInfo'] && a['starterInfo'].status != 'UNPLAYED' ? a['player'].pts : a['stats'].offense.ptsPerGame) <= (b['starterInfo'] && b['starterInfo'].status != 'UNPLAYED' ? b['player'].pts : b['stats'].offense.ptsPerGame)) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nbaleaders') {
          if (a['stats'].offense.pts >= b['stats'].offense.pts) {
            return -1;
          } else if (a['stats'].offense.pts <= b['stats'].offense.pts) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nbaleadersreb') {
          if (a['stats'].rebounds.reb >= b['stats'].rebounds.reb) {
            return -1;
          } else if (a['stats'].rebounds.reb <= b['stats'].rebounds.reb) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nbaleadersast') {
          if (a['stats'].offense.ast >= b['stats'].offense.ast) {
            return -1;
          } else if (a['stats'].offense.ast <= b['stats'].offense.ast) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nbaleadersstl') {
          if (a['stats'].defense.stl >= b['stats'].defense.stl) {
            return -1;
          } else if (a['stats'].defense.stl <= b['stats'].defense.stl) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nbaleadersthree') {
          if (a['stats'].fieldGoals.fg3PtMade >= b['stats'].fieldGoals.fg3PtMade) {
            return -1;
          } else if (a['stats'].fieldGoals.fg3PtMade <= b['stats'].fieldGoals.fg3PtMade) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nbaleadersblk') {
          if (a['stats'].defense.blk >= b['stats'].defense.blk) {
            return -1;
          } else if (a['stats'].defense.blk <= b['stats'].defense.blk) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nbaleadersshots') {
          if (a['stats'].fieldGoals.fgAtt >= b['stats'].fieldGoals.fgAtt) {
            return -1;
          } else if (a['stats'].fieldGoals.fgAtt <= b['stats'].fieldGoals.fgAtt) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nbaleadersavg') {
          if (a['stats'].offense.ptsPerGame >= b['stats'].offense.ptsPerGame) {
            return -1;
          } else if (a['stats'].offense.ptsPerGame <= b['stats'].offense.ptsPerGame) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nbaleadersfgpct') {
        if (a['stats'].fieldGoals.fgPct >= b['stats'].fieldGoals.fgPct) {
          return -1;
        } else if (a['stats'].fieldGoals.fgPct <= b['stats'].fieldGoals.fgPct) {
          return 1;
        } else {
          return 0;
        }
    } else if (field === 'nbaleaderstov') {
      if (a['stats'].defense.tov >= b['stats'].defense.tov) {
        return -1;
      } else if (a['stats'].defense.tov <= b['stats'].defense.tov) {
        return 1;
      } else {
        return 0;
      }
  }
      
    });
    return array;
  }
}