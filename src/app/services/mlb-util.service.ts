import { Injectable } from '@angular/core';
let mlbImageRoot = `https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_100/v1/people/`;
let mlbImageEnd = `/headshot/67/current`;

@Injectable({
  providedIn: 'root'
})
export class MlbUtilService {
  public startingPitchers: any;

  constructor() {

      this.startingPitchers = {
        '10779':{
          id: 10779,
          firstName: "Arron",
          lastName: "Nola",
          teamId: 129,
          abbreviation: "PHI",
          rotationSpot: 1,
          active: true,
          img: mlbImageRoot+'605400'+mlbImageEnd,
          new: true
        },
        '10399':{
          id: 10399,
          firstName: "German",
          lastName: "Marquez",
          teamId: 138,
          abbreviation: "COL",
          rotationSpot: 1,
          active: true,
          img: mlbImageRoot+'608566'+mlbImageEnd,
          new: true
        },
        '11068':{
          id: 11068,
          firstName: "Dylan",
          lastName: "Bundy",
          teamId: 124,
          abbreviation: "LAA",
          rotationSpot: 1,
          active: true,
          img: mlbImageRoot+'605164'+mlbImageEnd,
          new: true
        },
        '10883':{
          id: 10883,
          firstName: "Madison",
          lastName: "Bumgarner",
          teamId: 140,
          abbreviation: "ARI",
          rotationSpot: 1,
          active: true,
          img: mlbImageRoot+'518516'+mlbImageEnd,
          new: true
        },
        '10446':{
          id: 10446,
          firstName: "Mathew",
          lastName: "Boyd",
          teamId: 117,
          abbreviation: "DET",
          rotationSpot: 1,
          active: true,
          img: mlbImageRoot+'571510'+mlbImageEnd,
          new: true
        },
        '10797':{
          id: 10797,
          firstName: "Chad",
          lastName: "Kuhl",
          teamId: 132,
          abbreviation: "PIT",
          rotationSpot: 1,
          active: true,
          img: mlbImageRoot+'641771'+mlbImageEnd,
          new: true
        },
        
        
      }

   }

   public getStartingPitchers() {
     return this.startingPitchers;
   }

   public getNewPitcher() {
    let newPitcher = null;
    newPitcher = {
        player: {
        id: 0,
        firstName: "none",
        lastName: "none",
        primaryPosition: "P",
        jerseyNumber: 0,
        currentTeam: {
        id: 0,
        abbreviation: "None"
        },
        currentRosterStatus: "ROSTER",
        currentInjury: null,
        height: "0",
        weight: 0,
        birthDate: "none",
        age: 0,
        birthCity: "none",
        birthCountry: "none",
        rookie: false,
        highSchool: null,
        college: null,
        handedness: {
        catches: "none"
        },
        officialImageSrc: "none",
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "none"
        }
        ]
        },
        team: {
        id: null,
        abbreviation: "None"
        },
        stats: {
          gamesPlayed: 0,
          miscellaneous: {
            gamesStarted: 0
          },
        pitching: {
          balks: 0,
          battersHit: 0,
          completedGames: 0,
          earnedRunAvg: 0,
          earnedRunsAllowed: 0,
          fp: 0,
          fpa: 0,
          gamesFinished: 0,
          hitsAllowed: 0,
          hitsAllowedPer9Innings: 0,
          holds: 0,
          homerunsAllowed: 0,
          inningsPitched: 0,
          losses: 0,
          pickoffAttempts: 0,
          pickoffs: 0,
          pitcher2SeamFastballs: 0,
          pitcher2SeamFastballsToday: 0,
          pitcher4SeamFastballs: 0,
          pitcher4SeamFastballsToday: 0,
          pitcherAtBats: 0,
          pitcherCaughtStealing: 0,
          pitcherChangeups: 0,
          pitcherChangeupsToday: 0,
          pitcherCurveballs: 0,
          pitcherCurveballsToday: 0,
          pitcherCutters: 0,
          pitcherCuttersToday: 0,
          pitcherDoublePlays: 0,
          pitcherFlyBalls: 0,
          pitcherFlyOuts: 0,
          pitcherGroundBalls: 0,
          pitcherGroundOutToFlyOutRatio: 0,
          pitcherGroundOuts: 0,
          pitcherIntentionalWalks: 0,
          pitcherLineDrives: 0,
          pitcherOnBasePct: 0,
          pitcherOnBasePlusSluggingPct: 0,
          pitcherSacrificeBunts: 0,
          pitcherSacrificeFlies: 0,
          pitcherSinkers: 0,
          pitcherSinkersToday: 0,
          pitcherSliders: 0,
          pitcherSlidersToday: 0,
          pitcherSluggingPct: 0,
          pitcherSplitters: 0,
          pitcherSplittersToday: 0,
          pitcherStolenBasesAllowed: 0,
          pitcherStrikeouts: 0,
          pitcherStrikes: 0,
          pitcherStrikesFoul: 0,
          pitcherStrikesLooking: 0,
          pitcherStrikesMiss: 0,
          pitcherSwings: 0,
          pitcherTriplePlays: 0,
          pitcherWalks: 0,
          pitcherWildPitches: 0,
          pitchesPerInning: 0,
          pitchesThrown: 0,
          pitchingAvg: 0,
          runsAllowed: 0,
          saveOpportunities: 0,
          saves: 0,
          secondBaseHitsAllowed: 0,
          shutouts: 0,
          strikeoutsPer9Innings: 0,
          strikeoutsToWalksRatio: 0,
          thirdBaseHitsAllowed: 0,
          totalBattersFaced: 0,
          walksAllowedPer9Innings: 0,
          walksAndHitsPerInningPitched: 0,
          winPct: 0,
          wins: 0


        }
          
        }
      }
    return newPitcher;
  }
}
