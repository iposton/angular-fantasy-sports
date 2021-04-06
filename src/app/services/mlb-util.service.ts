import { Injectable } from '@angular/core';
let mlbImageRoot = `https://img.mlbstatic.com/mlb-photos/image/upload/w_426,q_100/v1/people/`;
let mlbImageEnd = `/headshot/67/current`;

@Injectable({
  providedIn: 'root'
})
export class MlbUtilService {
  public startingPitchers: any;
  public MLBImages: any;
  public mlbTeams: any; 

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
          new: false
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
          new: false
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
          new: false
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
          new: false
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
          new: false
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
          new: false
        },
        '12626':{
          id: 12626,
          firstName: "Chris",
          lastName: "Flexen",
          teamId: 123,
          abbreviation: "SEA",
          rotationSpot: 3,
          active: true,
          img: mlbImageRoot+'623167'+mlbImageEnd,
          new: true
        },
        '14228':{
          id: 14228,
          firstName: "Tanner",
          lastName: "Houck",
          teamId: 113,
          abbreviation: "BOS",
          rotationSpot: 2,
          active: true,
          img: mlbImageRoot+'656557'+mlbImageEnd,
          new: true
        }, 
        '28824':{
          id: 28824,
          firstName: "Kohei",
          lastName: "Arihara",
          teamId: 121,
          abbreviation: "TEX",
          rotationSpot: 3,
          active: true,
          img: mlbImageRoot+'685503'+mlbImageEnd,
          new: true
        },
        '11083':{
          id: 11083,
          firstName: "Domingo",
          lastName: "German",
          teamId: 114,
          abbreviation: "NYY",
          rotationSpot: 3,
          active: true,
          img: mlbImageRoot+'593334'+mlbImageEnd,
          new: true
        },
        '10891':{
          id: 10891,
          firstName: "Matt",
          lastName: "Moore",
          teamId: 129,
          abbreviation: "PHI",
          rotationSpot: 4,
          active: true,
          img: mlbImageRoot+'519043'+mlbImageEnd,
          new: true
        },
        '11017':{
          id: 11017,
          firstName: "Marcus",
          lastName: "Stroman",
          teamId: 127,
          abbreviation: "NYM",
          rotationSpot: 2,
          active: true,
          img: mlbImageRoot+'573186'+mlbImageEnd,
          new: true
        },
        '11014':{
          id: 11014,
          firstName: "Aaron",
          lastName: "Sanchez",
          teamId: 136,
          abbreviation: "SF",
          rotationSpot: 5,
          active: true,
          img: mlbImageRoot+'592717'+mlbImageEnd,
          new: true
        },
        
      }

      this.MLBImages = {
        "14207": {
          firstName: "Ian",
          lastName: "Anderson",
          image: mlbImageRoot+"666120"+mlbImageEnd
        }, 
        "14236": {
          firstName: "Dane",
          lastName: "Dunning",
          image: mlbImageRoot+"641540"+mlbImageEnd
        }, 
        "14200": {
          firstName: "Sixto",
          lastName: "Sanchez",
          image: mlbImageRoot+"664350"+mlbImageEnd
        },
        "14245": {
          firstName: "Jesus",
          lastName: "Luzardo",
          image: mlbImageRoot+"666200"+mlbImageEnd
        },
        "15641": {
          firstName: "Christian",
          lastName: "Javier",
          image: mlbImageRoot+"664299"+mlbImageEnd
        },
        "17844": {
          firstName: "Kwang Hyun",
          lastName: "Kim",
          image: mlbImageRoot+"547942"+mlbImageEnd
        },
        "15851": {
          firstName: "Devie",
          lastName: "Garcia",
          image: mlbImageRoot+"665620"+mlbImageEnd
        },
        "22220": {
          firstName: "Luis",
          lastName: "Garcia",
          image: mlbImageRoot+"677651"+mlbImageEnd
        },
        "14228":{
          firstName: "Tanner",
          lastName: "Houck",
          image: mlbImageRoot+'656557'+mlbImageEnd,
        },
        "28824":{
          firstName: "Kohei",
          lastName: "Arihara",
          image: mlbImageRoot+'685503'+mlbImageEnd,
        },
        "19966":{
          firstName: "Tarik",
          lastName: "Skubal",
          image: mlbImageRoot+'669373'+mlbImageEnd,
        },
        "17579":{
          firstName: "Bruce",
          lastName: "Zimmermann",
          image: mlbImageRoot+'669145'+mlbImageEnd,
        },
        "15774":{
          firstName: "Brady",
          lastName: "Singer",
          image: mlbImageRoot+'663903'+mlbImageEnd,
        },
        "14647":{
          firstName: "Taylor",
          lastName: "Widener",
          image: mlbImageRoot+'642203'+mlbImageEnd,
        },
        "14409":{
          firstName: "T.J.",
          lastName: "Zeuch",
          image: mlbImageRoot+'643615'+mlbImageEnd,
        }, 
        "15648":{
          firstName: "Gavin",
          lastName: "Lux",
          image: mlbImageRoot+'666158'+mlbImageEnd,
        },
        "15699":{
          firstName: "Alec",
          lastName: "Bohm",
          image: mlbImageRoot+'664761'+mlbImageEnd,
        },
        "14251":{
          firstName: "Ryan",
          lastName: "Mountcastle",
          image: mlbImageRoot+'663624'+mlbImageEnd,
        },
        "14181":{
          firstName: "Trevor",
          lastName: "Rogers",
          image: mlbImageRoot+'669432'+mlbImageEnd,
        },
        "15533":{
          firstName: "JT",
          lastName: "Brubaker",
          image: mlbImageRoot+'664141'+mlbImageEnd,
        },
        "14651":{
          firstName: "Casey",
          lastName: "Mize",
          image: mlbImageRoot+'663554'+mlbImageEnd,
        },
        "15986":{
          firstName: "Dean",
          lastName: "Kremer",
          image: mlbImageRoot+'665152'+mlbImageEnd,
        },
        "15649":{
          firstName: "Nick",
          lastName: "Madrigal",
          image: mlbImageRoot+'663611'+mlbImageEnd,
        },
        "14271":{
          firstName: "Luis",
          lastName: "Robert",
          image: mlbImageRoot+'673357'+mlbImageEnd,
        },
        "17866":{
          firstName: "Yoshi",
          lastName: "Tsutsugo",
          image: mlbImageRoot+'660294 '+mlbImageEnd,
        },        

      }

      this.mlbTeams = [
        {
          id: 111,
          city: "Baltimore",
          name: "Orioles",
          abbreviation: "BAL",
          twitter: "#Birdland",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/110.svg"
        },
        {
          id: 112,
          city: "Toronto",
          name: "Blue Jays",
          abbreviation: "TOR",
          twitter: "#WeAreBlueJays ",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/141.svg"
        },
        {
          id: 113,
          city: "Boston",
          name: "Red Sox",
          abbreviation: "BOS",
          twitter: "#DirtyWater",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/111.svg"
        },
        {
          id: 114,
          city: "New York",
          name: "Yankees",
          abbreviation: "NYY",
          twitter: "#NYYforNY",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/147.svg"
        },
        {
          id: 115,
          city: "Tampa Bay",
          name: "Rays",
          abbreviation: "TB",
          twitter: "#RaysUp",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/139.svg"
        },
        {
          id: 116,
          city: "Cleveland",
          name: "Indians",
          abbreviation: "CLE",
          twitter: "#OurTribe",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/114.svg"
        },
        {
          id: 117,
          city: "Detroit",
          name: "Tigers",
          abbreviation: "DET",
          twitter: "#DetroitRoots",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/116.svg"
        },
        {
          id: 118,
          city: "Kansas City",
          name: "Royals",
          abbreviation: "KC",
          twitter: "#TogetherRoyal",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/118.svg"
        },
        {
          id: 119,
          city: "Chicago",
          name: "White Sox",
          abbreviation: "CWS",
          twitter: "#ChangetheGame",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/145.svg"
        },
        {
          id: 120,
          city: "Minnesota",
          name: "Twins",
          abbreviation: "MIN",
          twitter: "#MNTwins",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/142.svg"
        },
        {
          id: 121,
          city: "Texas",
          name: "Rangers",
          abbreviation: "TEX",
          twitter: "#StraightUpTX",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/140.svg"
        },
        {
          id: 122,
          city: "Houston",
          name: "Astros",
          abbreviation: "HOU",
          twitter: "#ForTheH",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/117.svg"
        },
        {
          id: 123,
          city: "Seattle",
          name: "Mariners",
          abbreviation: "SEA",
          twitter: "#SeaUsRise",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/136.svg"
        },
        {
          id: 124,
          city: "Los Angeles",
          name: "Angels",
          abbreviation: "LAA",
          twitter: "#WeBelieve",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/108.svg"
        },
        {
          id: 125,
          city: "Oakland",
          name: "Athletics",
          abbreviation: "OAK",
          twitter: "#RiseAndGrind",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/133.svg"
        },
        {
          id: 126,
          city: "Washington",
          name: "Nationals",
          abbreviation: "WAS",
          twitter: "#Natitude",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/120.svg"
        },
        {
          id: 127,
          city: "New York",
          name: "Mets",
          abbreviation: "NYM",
          twitter: "#LGM",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/121.svg"
        },
        {
          id: 128,
          city: "Miami",
          name: "Marlins",
          abbreviation: "MIA",
          twitter: "#JuntosMiami",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/146.svg"
        },
        {
          id: 129,
          city: "Philadelphia",
          name: "Phillies",
          abbreviation: "PHI",
          twitter: "#RingTheBell",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/143.svg"
        },
        {
          id: 130,
          city: "Atlanta",
          name: "Braves",
          abbreviation: "ATL",
          twitter: "#ForTheA",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/144.svg"
        },
        {
          id: 131,
          city: "Chicago",
          name: "Cubs",
          abbreviation: "CHC",
          twitter: "#CubTogether",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/112.svg"
        },
        {
          id: 132,
          city: "Pittsburgh",
          name: "Pirates",
          abbreviation: "PIT",
          twitter: "#LetsGoBucs",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/134.svg"
        },
        {
          id: 133,
          city: "St. Louis",
          name: "Cardinals",
          abbreviation: "STL",
          twitter: "#STLFLY",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/138.svg"
        },
        {
          id: 134,
          city: "Milwaukee",
          name: "Brewers",
          abbreviation: "MIL",
          twitter: "#ThisIsMyCrew",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/158.svg"
        },
        {
          id: 135,
          city: "Cincinnati",
          name: "Reds",
          abbreviation: "CIN",
          twitter: "#ATOBTTR",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/113.svg"
        },
        {
          id: 136,
          city: "San Francisco",
          name: "Giants",
          abbreviation: "SF",
          twitter: "#ResilientSF",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/137.svg"
        },
        {
          id: 137,
          city: "Los Angeles",
          name: "Dodgers",
          abbreviation: "LAD",
          twitter: "#Dodgers",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/119.svg"
        },
        {
          id: 138,
          city: "Colorado",
          name: "Rockies",
          abbreviation: "COL",
          twitter: "#Rockies",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/115.svg"
        },
        {
          id: 139,
          city: "San Diego",
          name: "Padres",
          abbreviation: "SD",
          twitter: "#HungryForMore",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/135.svg"
        },
        {
          id: 140,
          city: "Arizona",
          name: "Diamondbacks",
          abbreviation: "ARI",
          twitter: "#RattleOn",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/109.svg"
        }
    ]

   }

  public getMLBImages() {
    return this.MLBImages;
  }

  public getStartingPitchers() {
    return this.startingPitchers;
  }

  public getMLBTeams() {
    return this.mlbTeams;
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
