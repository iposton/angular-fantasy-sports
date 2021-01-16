import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NhlUtilService {
  
  constructor() {
    
   }

  public getNewGoalie() {
    let newGoalie = null;
    newGoalie = {
      player: {
      id: 0,
      firstName: "none",
      lastName: "none",
      primaryPosition: "G",
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
      scoring: {
      goals: 0,
      assists: 0,
      primaryAssists: 0,
      powerplayPrimaryAssists: 0,
      shorthandedPrimaryAssists: 0,
      secondaryAssists: 0,
      powerplaySecondaryAssists: 0,
      shorthandedSecondaryAssists: 0,
      points: 0,
      hatTricks: 0,
      powerplayGoals: 0,
      powerplayAssists: 0,
      powerplayPoints: 0,
      shorthandedGoals: 0,
      shorthandedAssists: 0,
      shorthandedPoints: 0,
      gameWinningGoals: 0,
      gameTyingGoals: 0,
      overtimeGoals: 0,
      shootoutAttempts: 0,
      shootoutMisses: 0,
      shootoutGoals: 0,
      shootoutGoalPercent: 0
      },
      penalties: {
      penalties: 0,
      penaltyMinutes: 0,
      minorPenalties: 0,
      minorPenaltyMinutes: 0,
      majorPenalties: 0,
      majorPenaltyMinutes: 0,
      doubleMinorPenalties: 0,
      doubleMinorPenaltyMinutes: 0,
      matchPenalties: 0,
      misconductPenalties: 0,
      misconductPenaltyMinutes: 0,
      penaltiesDrawn: 0,
      penaltyMinutesDrawn: 0,
      fights: 0
      },
      goaltending: {
      wins: 0,
      losses: 0,
      overtimeWins: 0,
      overtimeLosses: 0,
      shootoutWins: 0,
      shootoutLosses: 0,
      goalsAgainst: 0,
      evenStrengthGoalsAgainst: 0,
      powerplayGoalsAgainst: 0,
      shorthandedGoalsAgainst: 0,
      shotsAgainst: 0,
      evenStrengthShotsAgainst: 0,
      powerplayShotsAgainst: 0,
      shorthandedShotsAgainst: 0,
      overtimeGoalsAgainst: 0,
      saves: 0,
      evenStrengthSaves: 0,
      powerplaySaves: 0,
      shorthandedSaves: 0,
      goalsAgainstAverage: 0,
      savePercentage: 0,
      shutouts: 0,
      gamesStarted: 0,
      creditForGame: 0,
      shootoutDefences: 0,
      shootoutSaves: 0,
      shootoutSavePercent: 0,
      shootoutGoalsAgainst: 0,
      minutesPlayed: 0
      },
      shifts: {
      shifts: 0,
      evenStrengthShifts: 0,
      powerplayShifts: 0,
      shorthandedShifts: 0,
      timeOnIceSeconds: 0,
      evenStrengthTimeOnIceSeconds: 0,
      powerplayTimeOnIceSeconds: 0,
      shorthandedTimeOnIceSeconds: 0
      }
      }
      }
    return newGoalie;
  }

  
}
