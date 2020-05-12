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
        } else if (field === 'nhlGoals') {
          if (a['stats'].scoring.goals >= b['stats'].scoring.goals) {
            return -1;
          } else if (a['stats'].scoring.goals <= b['stats'].scoring.goals) {
            return 1;
          } else {
            return 0;
          }
      } else if (field === 'nhlAst') {
        if (a['stats'].scoring.assists >= b['stats'].scoring.assists) {
          return -1;
        } else if (a['stats'].scoring.assists <= b['stats'].scoring.assists) {
          return 1;
        } else {
          return 0;
        }
      } else if (field === 'nhlPPG') {
        if (a['stats'].scoring.powerplayGoals >= b['stats'].scoring.powerplayGoals) {
          return -1;
        } else if (a['stats'].scoring.powerplayGoals <= b['stats'].scoring.powerplayGoals) {
          return 1;
        } else {
          return 0;
        }
      } else if (field === 'nhlPPA') {
        if (a['stats'].scoring.powerplayAssists >= b['stats'].scoring.powerplayAssists) {
          return -1;
        } else if (a['stats'].scoring.powerplayAssists <= b['stats'].scoring.powerplayAssists) {
          return 1;
        } else {
          return 0;
        }
      } else if (field === 'nhlGWG') {
        if (a['stats'].scoring.gameWinningGoals >= b['stats'].scoring.gameWinningGoals) {
          return -1;
        } else if (a['stats'].scoring.gameWinningGoals <= b['stats'].scoring.gameWinningGoals) {
          return 1;
        } else {
          return 0;
        }
      } else if (field === 'nhlPts') {
        if (a['stats'].scoring.points >= b['stats'].scoring.points) {
          return -1;
        } else if (a['stats'].scoring.points <= b['stats'].scoring.points) {
          return 1;
        } else {
          return 0;
        }
      } else if (field === 'nhlShots') {
        if (a['stats'].skating != null && b['stats'].skating) {
          if (a['stats'].skating.shots >= b['stats'].skating.shots) {
            return -1;
          } else if (a['stats'].skating.shots <= b['stats'].skating.shots) {
            return 1;
          } else {
            return 0;
          }
        }
        
      } else if (field === 'nhlBlk') {
        if (a['stats'].skating != null && b['stats'].skating) {
          if (a['stats'].skating.blockedShots >= b['stats'].skating.blockedShots) {
            return -1;
          } else if (a['stats'].skating.blockedShots <= b['stats'].skating.blockedShots) {
            return 1;
          } else {
            return 0;
          }
        }
      } else if (field === 'nhlSaves') {
        if (a['stats'].goaltending != null && b['stats'].goaltending) {
          if (a['stats'].goaltending.saves >= b['stats'].goaltending.saves) {
            return -1;
          } else if (a['stats'].goaltending.saves <= b['stats'].goaltending.saves) {
            return 1;
          } else {
            return 0;
          }
        }
      } else if (field === 'nhlWins') {
        if (a['stats'].goaltending != null && b['stats'].goaltending) {
          if (a['stats'].goaltending.wins >= b['stats'].goaltending.wins) {
            return -1;
          } else if (a['stats'].goaltending.wins <= b['stats'].goaltending.wins) {
            return 1;
          } else {
            return 0;
          }
        }
      } else if (field === 'nhlOTW') {
        if (a['stats'].goaltending != null && b['stats'].goaltending) {
          if (a['stats'].goaltending.overtimeWins >= b['stats'].goaltending.overtimeWins) {
            return -1;
          } else if (a['stats'].goaltending.overtimeWins <= b['stats'].goaltending.overtimeWins) {
            return 1;
          } else {
            return 0;
          }
        }
      } else if (field === 'nhlGA') {
        if (a['stats'].goaltending != null && b['stats'].goaltending) {
          if (a['stats'].goaltending.goalsAgainst >= b['stats'].goaltending.goalsAgainst) {
            return -1;
          } else if (a['stats'].goaltending.goalsAgainst <= b['stats'].goaltending.goalsAgainst) {
            return 1;
          } else {
            return 0;
          }
        }
      } else if (field === 'nhlLosses') {
        if (a['stats'].goaltending != null && b['stats'].goaltending) {
          if (a['stats'].goaltending.losses >= b['stats'].goaltending.losses) {
            return -1;
          } else if (a['stats'].goaltending.losses <= b['stats'].goaltending.losses) {
            return 1;
          } else {
            return 0;
          }
        }
      }  else if (field === 'nhlSO') {
        if (a['stats'].goaltending != null && b['stats'].goaltending) {
          if (a['stats'].goaltending.shutouts >= b['stats'].goaltending.shutouts) {
            return -1;
          } else if (a['stats'].goaltending.shutouts <= b['stats'].goaltending.shutouts) {
            return 1;
          } else {
            return 0;
          }
        }
      }  else if (field === 'nhlOTL') {
        if (a['stats'].goaltending != null && b['stats'].goaltending) {
          if (a['stats'].goaltending.overtimeLosses >= b['stats'].goaltending.overtimeLosses) {
            return -1;
          } else if (a['stats'].goaltending.overtimeLosses <= b['stats'].goaltending.overtimeLosses) {
            return 1;
          } else {
            return 0;
          }
        }
      } else if (field === 'mlbK') {
        if (a['stats'].pitching != null && b['stats'].pitching) {
          if (a['stats'].pitching.pitcherStrikeouts >= b['stats'].pitching.pitcherStrikeouts) {
            return -1;
          } else if (a['stats'].pitching.pitcherStrikeouts <= b['stats'].pitching.pitcherStrikeouts) {
            return 1;
          } else {
            return 0;
          }
        }
      } else if (field === 'mlbW') {
        if (a['stats'].pitching != null && b['stats'].pitching) {
          if (a['stats'].pitching.wins >= b['stats'].pitching.wins) {
            return -1;
          } else if (a['stats'].pitching.wins <= b['stats'].pitching.wins) {
            return 1;
          } else {
            return 0;
          }
        }
      } else if (field === 'mlbEra') {
        if (a['stats'].pitching != null && b['stats'].pitching) {
          if (a['stats'].pitching.earnedRunAvg <= b['stats'].pitching.earnedRunAvg) {
            return -1;
          } else if (a['stats'].pitching.earnedRunAvg >= b['stats'].pitching.earnedRunAvg) {
            return 1;
          } else {
            return 0;
          }
        }
      } else if (field === 'mlbSv') {
        if (a['stats'].pitching != null && b['stats'].pitching) {
          if (a['stats'].pitching.saves >= b['stats'].pitching.saves) {
            return -1;
          } else if (a['stats'].pitching.saves <= b['stats'].pitching.saves) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    });
    return array;
  }
}