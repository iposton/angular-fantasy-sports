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
          firstName: "Aaron",
          lastName: "Nola",
          teamId: 129,
          abbreviation: "PHI",
          rotationSpot: 1,
          active: true,
          img: mlbImageRoot+'605400'+mlbImageEnd,
          new: false
        },
        '10953':{
          id: 10953,
          firstName: "Jake",
          lastName: "Odorizzi",
          teamId: 122,
          abbreviation: "HOU",
          rotationSpot: 4,
          active: true,
          img: mlbImageRoot+'543606'+mlbImageEnd,
          new: false
        },
        '15631':{
          id: 15631,
          firstName: "Zac",
          lastName: "Gallen",
          teamId: 140,
          abbreviation: "ARI",
          rotationSpot: 4,
          active: true,
          img: mlbImageRoot+'668678'+mlbImageEnd,
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
          new: false
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
          new: false
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
          new: false
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
          new: false
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
          new: false
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
          new: false
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
          new: false
        },
        '10803':{
          id: 10803,
          firstName: "Jameson",
          lastName: "Taillon",
          teamId: 114,
          abbreviation: "NY",
          rotationSpot: 5,
          active: true,
          img: mlbImageRoot+'592791'+mlbImageEnd,
          new: false
        },
        '10291':{
          id: 10291,
          firstName: "Eduardo",
          lastName: "Rodriguez",
          teamId: 113,
          abbreviation: "BOS",
          rotationSpot: 3,
          active: true,
          img: mlbImageRoot+'593958'+mlbImageEnd,
          new: false
        },
        '11041':{
          id: 11041,
          firstName: "Joe",
          lastName: "Ross",
          teamId: 113,
          abbreviation: "WAS",
          rotationSpot: 3,
          active: true,
          img: mlbImageRoot+'605452'+mlbImageEnd,
          new: false
        },
        '10944':{
          id: 10944,
          firstName: "Chris",
          lastName: "Archer",
          teamId: 115,
          abbreviation: "TB",
          rotationSpot: 3,
          active: true,
          img: mlbImageRoot+'502042'+mlbImageEnd,
          new: false
        },
        '17869':{
          id: 17869,
          firstName: "Josh",
          lastName: "Fleming",
          teamId: 115,
          abbreviation: "TB",
          rotationSpot: 4,
          active: true,
          img: mlbImageRoot+'676596'+mlbImageEnd,
          new: false
        },
        '20448':{
          id: 20448,
          firstName: "Daniel",
          lastName: "Castano",
          teamId: 128,
          abbreviation: "MIA",
          rotationSpot: 5,
          active: true,
          img: mlbImageRoot+'641447'+mlbImageEnd,
          new: false
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
          image: mlbImageRoot+'660294'+mlbImageEnd,
        },
        "14171":{
          firstName: "Justin",
          lastName: "Dunn",
          image: mlbImageRoot+'643290'+mlbImageEnd,
        }, 
        "14309":{
          firstName: "Evan",
          lastName: "White",
          image: mlbImageRoot+'657108'+mlbImageEnd,
        },
        "14428":{
          firstName: "Nick",
          lastName: "Neidert",
          image: mlbImageRoot+'663734'+mlbImageEnd,
        },
        "17558":{
          firstName: "Riley",
          lastName: "Smith",
          image: mlbImageRoot+'642092'+mlbImageEnd,
        },
        "20448":{
          firstName: "Daniel",
          lastName: "Castano",
          image: mlbImageRoot+'641447'+mlbImageEnd,
        },
        "14367":{
          firstName: "Triston",
          lastName: "McKenzie",
          image: mlbImageRoot+'663474'+mlbImageEnd,
        },
        "17869":{
          firstName: "Josh",
          lastName: "Fleming",
          image: mlbImageRoot+'676596'+mlbImageEnd,
        },
        "15793":{
          firstName: "Ryan",
          lastName: "Weathers",
          image: mlbImageRoot+'677960'+mlbImageEnd,
        },
        "17123":{
          firstName: "Michael",
          lastName: "King",
          image: mlbImageRoot+'650633'+mlbImageEnd,
        },
        "15638":{
          firstName: "Nico",
          lastName: "Hoerner",
          image: mlbImageRoot+'663538'+mlbImageEnd,
        },
        "28879":{
          firstName: "Nick",
          lastName: "Maton",
          image: mlbImageRoot+'665155'+mlbImageEnd,
        },
        "17718":{
          firstName: "Jose",
          lastName: "Rojas",
          image: mlbImageRoot+'670351'+mlbImageEnd,
        },
        "14325":{
          firstName: "Pavin",
          lastName: "Smith",
          image: mlbImageRoot+'656976'+mlbImageEnd,
        },
        "15532":{
          firstName: "Tyrone",
          lastName: "Taylor",
          image: mlbImageRoot+'621438'+mlbImageEnd,
        },
        "12383":{
          firstName: "Dylan",
          lastName: "Carlson",
          image: mlbImageRoot+'666185'+mlbImageEnd,
        },
        "15902":{
          firstName: "Shane",
          lastName: "McClanahan",
          image: mlbImageRoot+'663556'+mlbImageEnd,
        },
        "12400":{
          firstName: "Kyle",
          lastName: "Lewis",
          image: mlbImageRoot+'641786'+mlbImageEnd,
        },
        "14328":{
          firstName: "Jazz",
          lastName: "Chisholm Jr.",
          image: mlbImageRoot+'665862'+mlbImageEnd,
        },
        "14424":{
          firstName: "Anthony",
          lastName: "Kay",
          image: mlbImageRoot+'641743'+mlbImageEnd,
        },
        "15782":{
          firstName: "Keegan",
          lastName: "Thompson",
          image: mlbImageRoot+'624522'+mlbImageEnd,
        },
        "17610":{
          firstName: "Yermin",
          lastName: "Mercedes",
          image: mlbImageRoot+'606213'+mlbImageEnd,
        },
        "29999":{
          firstName: "Tylor",
          lastName: "Megill",
          image: mlbImageRoot+'656731'+mlbImageEnd,
        },
        "29949":{
          firstName: "Joe",
          lastName: "Ryan",
          image: mlbImageRoot+'657746'+mlbImageEnd,
        },
        
        
      }

      this.mlbTeams = [
        {
          id: 111,
          city: "Baltimore",
          name: "Orioles",
          abbreviation: "BAL",
          twitter: "#Birdland",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/110.svg",
          gamesToday: 0,
          gameIds: []
          
        },
        {
          id: 112,
          city: "Toronto",
          name: "Blue Jays",
          abbreviation: "TOR",
          twitter: "#WeAreBlueJays ",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/141.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 113,
          city: "Boston",
          name: "Red Sox",
          abbreviation: "BOS",
          twitter: "#DirtyWater",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/111.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 114,
          city: "New York",
          name: "Yankees",
          abbreviation: "NYY",
          twitter: "#SquadUp",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/147.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 115,
          city: "Tampa Bay",
          name: "Rays",
          abbreviation: "TB",
          twitter: "#RaysUp",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/139.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 116,
          city: "Cleveland",
          name: "Indians",
          abbreviation: "CLE",
          twitter: "#OurCLE",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/114.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 117,
          city: "Detroit",
          name: "Tigers",
          abbreviation: "DET",
          twitter: "#DetroitRoots",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/116.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 118,
          city: "Kansas City",
          name: "Royals",
          abbreviation: "KC",
          twitter: "#TogetherRoyal",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/118.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 119,
          city: "Chicago",
          name: "White Sox",
          abbreviation: "CWS",
          twitter: "#ChangetheGame",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/145.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 120,
          city: "Minnesota",
          name: "Twins",
          abbreviation: "MIN",
          twitter: "#MNTwins",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/142.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 121,
          city: "Texas",
          name: "Rangers",
          abbreviation: "TEX",
          twitter: "#StraightUpTX",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/140.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 122,
          city: "Houston",
          name: "Astros",
          abbreviation: "HOU",
          twitter: "#ForTheH",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/117.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 123,
          city: "Seattle",
          name: "Mariners",
          abbreviation: "SEA",
          twitter: "#SeaUsRise",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/136.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 124,
          city: "Los Angeles",
          name: "Angels",
          abbreviation: "LAA",
          twitter: "#WeBelieve",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/108.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 125,
          city: "Oakland",
          name: "Athletics",
          abbreviation: "OAK",
          twitter: "#RiseAndGrind",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/133.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 126,
          city: "Washington",
          name: "Nationals",
          abbreviation: "WAS",
          twitter: "#Natitude",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/120.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 127,
          city: "New York",
          name: "Mets",
          abbreviation: "NYM",
          twitter: "#LGM",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/121.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 128,
          city: "Miami",
          name: "Marlins",
          abbreviation: "MIA",
          twitter: "#JuntosMiami",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/146.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 129,
          city: "Philadelphia",
          name: "Phillies",
          abbreviation: "PHI",
          twitter: "#RingTheBell",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/143.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 130,
          city: "Atlanta",
          name: "Braves",
          abbreviation: "ATL",
          twitter: "#ForTheA",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/144.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 131,
          city: "Chicago",
          name: "Cubs",
          abbreviation: "CHC",
          twitter: "#CubTogether",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/112.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 132,
          city: "Pittsburgh",
          name: "Pirates",
          abbreviation: "PIT",
          twitter: "#LetsGoBucs",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/134.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 133,
          city: "St. Louis",
          name: "Cardinals",
          abbreviation: "STL",
          twitter: "#STLFLY",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/138.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 134,
          city: "Milwaukee",
          name: "Brewers",
          abbreviation: "MIL",
          twitter: "#ThisIsMyCrew",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/158.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 135,
          city: "Cincinnati",
          name: "Reds",
          abbreviation: "CIN",
          twitter: "#ATOBTTR",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/113.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 136,
          city: "San Francisco",
          name: "Giants",
          abbreviation: "SF",
          twitter: "#ResilientSF",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/137.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 137,
          city: "Los Angeles",
          name: "Dodgers",
          abbreviation: "LAD",
          twitter: "#Dodgers",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/119.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 138,
          city: "Colorado",
          name: "Rockies",
          abbreviation: "COL",
          twitter: "#Rockies",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/115.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 139,
          city: "San Diego",
          name: "Padres",
          abbreviation: "SD",
          twitter: "#HungryForMore",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/135.svg",
          gamesToday: 0,
          gameIds: []
        },
        {
          id: 140,
          city: "Arizona",
          name: "Diamondbacks",
          abbreviation: "ARI",
          twitter: "#RattleOn",
          officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/109.svg",
          gamesToday: 0,
          gameIds: []
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

  public qs(inn, er) {
    let quality = null;
    quality = inn >= 6 && er < 4 ? 1 : 0;
    return quality;
  }

  public round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  public fantasyPoints (player: any, type: string) {
    if (type === 'p') {
      //if (player.stats.pitching.wins >= 4 ||  )
      //TODO QS average if wins => 4 || ERA less than 4.00 qs 8 else if less than 4 wins and => 2 qs 4 else 1
      player.stats.pitching.fp = (player.stats.pitching.earnedRunsAllowed * -3) + player.stats.pitching.pitcherStrikeouts + player.stats.pitching.pickoffs + player.stats.pitching.pitcherFlyOuts + player.stats.pitching.pitcherGroundOuts;
      player.stats.pitching.fpa = Math.floor(player.stats.pitching.fp / player.stats.gamesPlayed);
      player.stats.pitching.pca = Math.floor(player.stats.pitching.pitchesThrown / player.stats.gamesPlayed); 

      player.stats.fanDuelFP = (player.stats.pitching.earnedRunsAllowed * -3) + (this.round(player.stats.pitching.inningsPitched * 3,1)) + (player.stats.pitching.qs ? player.stats.pitching.qs * 4 : 5 * 4) + (player.stats.pitching.pitcherStrikeouts * 3) + (player.stats.pitching.wins * 6);
      player.stats.fanDuelFPA = Math.floor(player.stats.fanDuelFP / player.stats.gamesPlayed);
      player.stats.pitching.fanDuelFP = player.stats.fanDuelFP
      player.stats.pitching.fanDuelFPA = player.stats.fanDuelFPA
    }

    if (type === 'b') {
      player.stats.batting.fp = (player.stats.batting.hits - player.stats.batting.extraBaseHits) + (player.stats.batting.secondBaseHits * 2) + (player.stats.batting.thirdBaseHits * 3) + (player.stats.batting.homeruns * 4) + player.stats.batting.runs + player.stats.batting.runsBattedIn + player.stats.batting.batterWalks + player.stats.batting.stolenBases + player.stats.batting.hitByPitch;
      player.stats.batting.fpa = Math.floor(player.stats.batting.fp / player.stats.gamesPlayed);

      player.stats.fanDuelFP = ((player.stats.batting.hits - player.stats.batting.extraBaseHits) * 3) + (player.stats.batting.secondBaseHits * 6) + (player.stats.batting.thirdBaseHits * 9) + (player.stats.batting.homeruns * 12) + (this.round(player.stats.batting.runs * 3.2,1)) + (this.round(player.stats.batting.runsBattedIn * 3.5,1)) + (player.stats.batting.batterWalks * 3) + (player.stats.batting.stolenBases * 6) + (player.stats.batting.hitByPitch * 3);  
      player.stats.fanDuelFPA = Math.floor(player.stats.fanDuelFP / player.stats.gamesPlayed);
      player.stats.batting.fanDuelFP = player.stats.fanDuelFP
      player.stats.batting.fanDuelFPA = player.stats.fanDuelFPA
    }  
  }

  public dailyFp (mdata, daily, type) {
    if (type === 'p') {

      if (daily.stats.pitching.pitcher2SeamFastballs >= 0 && 
        daily.stats.pitching.pitcher4SeamFastballs >= 0 && 
        daily.stats.pitching.pitcherChangeups >= 0 && 
        daily.stats.pitching.pitcherCurveballs >= 0 && 
        daily.stats.pitching.pitcherCutters >= 0 && 
        daily.stats.pitching.pitcherSliders >= 0 && 
        daily.stats.pitching.pitcherSinkers >= 0 && 
        daily.stats.pitching.pitcherSplitters >= 0) {
        mdata.player.favPitchToday = Math.max(daily.stats.pitching.pitcher2SeamFastballs, daily.stats.pitching.pitcher4SeamFastballs, daily.stats.pitching.pitcherChangeups, daily.stats.pitching.pitcherCurveballs, daily.stats.pitching.pitcherCutters, daily.stats.pitching.pitcherSliders, daily.stats.pitching.pitcherSinkers, daily.stats.pitching.pitcherSplitters);
        mdata.player.favPitchPercentToday = Math.floor(mdata.player.favPitchToday / daily.stats.pitching.pitchesThrown * 100);
      }
      //console.log(daily.game, 'get game info by player id')
      mdata.player.fpToday = 0;
      mdata.noHitterToday = false;
      mdata.completeGameToday = false;
      mdata.perfectGameToday = false;
      mdata.gameId = daily.game.id;
      mdata.player.winToday = daily.stats.pitching.wins;
      mdata.player.loseToday = daily.stats.pitching.losses;
      mdata.player.saveToday = daily.stats.pitching.saves;
      mdata.player.inningsToday = daily.stats.pitching.inningsPitched;
      mdata.player.earnedrunsToday = daily.stats.pitching.earnedRunsAllowed;
      mdata.player.strikeoutsToday = daily.stats.pitching.pitcherStrikeouts;
      mdata.player.hitsallowedToday = daily.stats.pitching.hitsAllowed;
      mdata.player.pitchesthrownToday = daily.stats.pitching.pitchesThrown;
      mdata.player.eraToday = daily.stats.pitching.earnedRunAvg.toFixed(2);
      mdata.player.pickoffsToday = daily.stats.pitching.pickoffs;
      mdata.player.flyoutsToday = daily.stats.pitching.pitcherFlyOuts;
      mdata.player.groundoutsToday = daily.stats.pitching.pitcherGroundOuts;
      mdata.player.walksToday = daily.stats.pitching.pitcherWalks;
      mdata.player.intentionalWalksToday = daily.stats.pitching.pitcherIntentionalWalks;
      mdata.player.battersHitToday = daily.stats.pitching.battersHit;
      mdata.player.qsToday = mdata.player.inningsToday >= 6 && mdata.player.earnedrunsToday < 4 ? 1 : 0;
      mdata.player.fpToday = (mdata.player.earnedrunsToday * -3) + mdata.player.strikeoutsToday + mdata.player.pickoffsToday + mdata.player.flyoutsToday + mdata.player.groundoutsToday;
  
      mdata.player.fanDuelFpToday = (mdata.player.earnedrunsToday * -3) + (this.round(mdata.player.inningsToday * 3,1)) + (mdata.player.qsToday * 4) + (mdata.player.strikeoutsToday * 3) + (mdata.player.winToday * 6)
      mdata.player.fanDuelFpToday = this.round(mdata.player.fanDuelFpToday, 1)
      mdata.stats.pitching.pitcher2SeamFastballsToday = daily.stats.pitching.pitcher2SeamFastballs;
      mdata.stats.pitching.pitcher4SeamFastballsToday = daily.stats.pitching.pitcher4SeamFastballs;
      mdata.stats.pitching.pitcherChangeupsToday = daily.stats.pitching.pitcherChangeups;
      mdata.stats.pitching.pitcherCurveballsToday = daily.stats.pitching.pitcherCurveballs;
      mdata.stats.pitching.pitcherCuttersToday = daily.stats.pitching.pitcherCutters;
      mdata.stats.pitching.pitcherSlidersToday = daily.stats.pitching.pitcherSliders;
      mdata.stats.pitching.pitcherSinkersToday = daily.stats.pitching.pitcherSinkers;
      mdata.stats.pitching.pitcherSplittersToday = daily.stats.pitching.pitcherSplitters;
  
      if (mdata.player.hitsallowedToday === 0 && mdata.player.inningsToday === 9 || 
        mdata.player.gameLocation === "away" && mdata.player.inningsToday === 8 && mdata.player.hitsallowedToday === 0) {
        mdata.noHitterToday = true;
      } 
  
      if (mdata.player.inningsToday === 9 || 
        mdata.player.gameLocation === "away" && mdata.player.inningsToday === 8) {
        //if game over after the 9th inning or if 
        // inning length equals game inning length
        // or if you pitch 8 innings and away and lose
        mdata.completeGameToday = true;
      }
  
      if (mdata.player.winToday === 1 && mdata.player.hitsallowedToday === 0 && mdata.player.inningsToday === 9 &&
        mdata.player.earnedrunsToday === 0 && mdata.player.walksToday === 0 && 
        mdata.player.battersHitToday === 0 && mdata.player.intentionalWalksToday === 0) {
          //&& no runners on base by team error && win
          mdata.perfectGameToday = true;
      }

    }

    if (type === 'b1') {
      mdata.gameId = daily.game.id;
      mdata.player.fpToday = 0;
      mdata.stats.hitsToday = daily.stats.batting.hits ? daily.stats.batting.hits : 0;
      mdata.stats.runsToday = daily.stats.batting.runs ? daily.stats.batting.runs : 0;
      mdata.stats.rbiToday = daily.stats.batting.runsBattedIn ? daily.stats.batting.runsBattedIn : 0;
      mdata.stats.hrToday = daily.stats.batting.homeruns ? daily.stats.batting.homeruns : 0;
      mdata.stats.dblToday = daily.stats.batting.secondBaseHits ? daily.stats.batting.secondBaseHits : 0;
      mdata.stats.tplToday = daily.stats.batting.thirdBaseHits ? daily.stats.batting.thirdBaseHits : 0;
      mdata.stats.walksToday = daily.stats.batting.batterWalks ? daily.stats.batting.batterWalks : 0;
      mdata.stats.sbToday = daily.stats.batting.stolenBases ? daily.stats.batting.stolenBases : 0;
      mdata.stats.hbpToday = daily.stats.batting.hitByPitch ? daily.stats.batting.hitByPitch : 0;
      mdata.stats.fpToday = (mdata.stats.hitsToday - daily.stats.batting.extraBaseHits) + (mdata.stats.dblToday * 2) + (mdata.stats.tplToday * 3) + (mdata.stats.hrToday * 4) + mdata.stats.runsToday + mdata.stats.rbiToday + mdata.stats.walksToday + mdata.stats.sbToday + mdata.stats.hbpToday;

      mdata.stats.fanDuelFpToday = (mdata.stats.hitsToday - daily.stats.batting.extraBaseHits * 3) + (mdata.stats.dblToday * 6) + (mdata.stats.hrToday * 12) + (this.round(mdata.stats.runsToday * 3.2,1)) + (this.round(mdata.stats.rbiToday * 3.5,1)) + (mdata.stats.walksToday * 3) + (mdata.stats.sbToday * 6) + (mdata.stats.hbpToday * 3);  (mdata.stats.dblToday * 2) + (mdata.stats.tplToday * 3) + (mdata.stats.hrToday * 4)
    }

    if (type === 'b2') {
      mdata.player.fpToday2nd = 0;
      mdata.stats.hitsToday2nd = daily.stats.batting.hits ? daily.stats.batting.hits : 0;
      mdata.stats.runsToday2nd = daily.stats.batting.runs ? daily.stats.batting.runs : 0;
      mdata.stats.rbiToday2nd = daily.stats.batting.runsBattedIn ? daily.stats.batting.runsBattedIn : 0;
      mdata.stats.hrToday2nd = daily.stats.batting.homeruns ? daily.stats.batting.homeruns : 0;
      mdata.stats.dblToday2nd = daily.stats.batting.secondBaseHits ? daily.stats.batting.secondBaseHits : 0;
      mdata.stats.tplToday2nd = daily.stats.batting.thirdBaseHits ? daily.stats.batting.thirdBaseHits : 0;
      mdata.stats.walksToday2nd = daily.stats.batting.batterWalks ? daily.stats.batting.batterWalks : 0;
      mdata.stats.sbToday2nd = daily.stats.batting.stolenBases ? daily.stats.batting.stolenBases : 0;
      mdata.stats.hbpToday2nd = daily.stats.batting.hitByPitch ? daily.stats.batting.hitByPitch : 0;
      mdata.stats.fpToday2nd = (mdata.stats.hitsToday2nd - daily.stats.batting.extraBaseHits) + (mdata.stats.dblToday2nd * 2) + (mdata.stats.tplToday2nd * 3) + (mdata.stats.hrToday2nd * 4) + mdata.stats.runsToday2nd + mdata.stats.rbiToday2nd + mdata.stats.walksToday2nd + mdata.stats.sbToday2nd + mdata.stats.hbpToday2nd;

      mdata.stats.fanDuelFpToday2nd = (mdata.stats.hitsToday2nd - daily.stats.batting.extraBaseHits * 3) + (mdata.stats.dblToday2nd * 6) + (mdata.stats.hrToday2nd * 12) + (this.round(mdata.stats.runsToday2nd * 3.2,1)) + (this.round(mdata.stats.rbiToday2nd * 3.5,1)) + (mdata.stats.walksToday2nd * 3) + (mdata.stats.sbToday2nd * 6) + (mdata.stats.hbpToday2nd * 3)

    }
  }
}
