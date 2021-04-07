import { Injectable } from '@angular/core';
let nflImageRoot = 'https://static.www.nfl.com/image/private/t_player_profile_landscape_2x/f_auto/league/';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public weekTimes: Array<any> = [];
  public nflTeams: any;
  public NFLImages: any;
  public replaceImg: any;

  constructor() {
    this.weekTimes = [
      {
        dateBeg: 'Thu Sep 10 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Sep 17 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '1'
      },
      {
        dateBeg: 'Thu Sep 17 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Sep 24 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '2'
      },
      {
        dateBeg: 'Thu Sep 24 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Oct 01 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '3'
      },
      {
        dateBeg: 'Thu Oct 01 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Oct 08 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '4'
      },
      {
        dateBeg: 'Thu Oct 08 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Oct 15 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '5'
      },
      {
        dateBeg: 'Thu Oct 15 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Oct 22 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '6'
      },
      {
        dateBeg: 'Thu Oct 22 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Oct 29 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '7'
      },
      {
        dateBeg: 'Thu Oct 29 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Nov 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '8'
      },
      {
        dateBeg: 'Thu Nov 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Nov 12 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '9'
      },
      {
        dateBeg: 'Thu Nov 12 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Nov 19 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '10'
      },
      {
        dateBeg: 'Thu Nov 19 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Nov 26 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '11'
      },
      {
        dateBeg: 'Thu Nov 26 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 03 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '12'
      },
      {
        dateBeg: 'Thu Dec 03 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 10 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '13'
      },
      {
        dateBeg: 'Thu Dec 10 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 17 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '14'
      },
      {
        dateBeg: 'Thu Dec 17 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 24 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '15'
      },
      {
        dateBeg: 'Thu Dec 24 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Dec 31 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '16'
      },
      {
        dateBeg: 'Thu Dec 31 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Jan 07 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '17'
      },
      {
        dateBeg: 'Thu Jan 07 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Jan 14 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '18'
      },
      {
        dateBeg: 'Thu Jan 14 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Jan 21 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '19'
      },
      {
        dateBeg: 'Thu Jan 21 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Jan 28 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '20' //afc nfc final 4
      },
      {
        dateBeg: 'Thu Jan 28 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Thu Feb 11 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '22' //super bowl
      }
    ];

    this.replaceImg = {
      "8195" : {
        new: nflImageRoot+"en0ul7l1m9aqf7wffufg"
      },
      "7471" : {
        new: nflImageRoot+"vcjoh0xhf8ip8digkkai"
      },
      "7549" : {
        new: nflImageRoot+"sfehmfwtg9i5gdcpqzgf"
      },
      "14516" : {
        new: nflImageRoot+"cw9mplvltikyayjsjmc3"
      },
      "8190" : {
        new: nflImageRoot+"voakyrtj34sghkwxaxxf"
      },
      "8469" : {
        new: nflImageRoot+"ym7oprwel3dxbab0k7x9"
      },
      "5940" : {
        new: nflImageRoot+"xhkqvvkq3awveyhv0x4e"
      },
      "8272" : {
        new: nflImageRoot+"ttuzsfycx9n3wie83dsw"
      },
      "9741" : {
        new: nflImageRoot+"yeobojameg9dram1qiqo"
      },
      "8463" : {
        new: nflImageRoot+"qnt1kn2mouanpxvdvzvh"
      },
      "8305" : {
        new: nflImageRoot+"iwwyf70p2gckryfv7cyn"
      },
      "7888" : {
        new: nflImageRoot+"dindmtqwwvrzgkfsqfdb"
      },
      "16858" : {
        new: nflImageRoot+"htlt0h1p8gmpgrrbjyyj"
      },
      "18672" : {
        new: "https://static.www.nfl.com/image/private/t_headshot_desktop_2x/f_auto/league/to50lyvotmzynmy3ds1a"
      },
      "6114" : {
        new: nflImageRoot+"ublljy2omv3mulxf7kkp"
      },
      "18619" : {
        new: nflImageRoot+"mmx64blok0j1a5e9zhww"
      },
      "18624" : {
        new: nflImageRoot+"qgyu27brqcvyquh7btov"
      },
      "18578" : {
        new: nflImageRoot+"xcymtg1vdkbntbzlmbrw"
      },
      "6464" : {
        new: nflImageRoot+"bpeotcvx7x9lhrzccjgz"
      },
      "6756" : {
        new: nflImageRoot+"a7y4lor47rsusu08bise"
      },
      "19375" : {
        new: nflImageRoot+"m6btiz85brkj9bwim4yv"
      },
      "18732" : {
        new: nflImageRoot+"kfdhebiaodlh02eikayl"
      },
      "13028" : {
        new: nflImageRoot+"lplwsbpisofrdfyvtvfh"
      },
      "18650" : {
        new: nflImageRoot+"ijwidkupub1xzub4qiyb"
      },
      "18570" : {
        new: nflImageRoot+"kf5z3ytx4oh53xy8fudq"
      },
      "17040" : {
        new: nflImageRoot+"hzjeyplhs0f0koeqvgrm"
      },
      "8441" : {
        new: nflImageRoot+"gytzk7llt9p0qw22iayb"
      },
      "13210" : {
        new: nflImageRoot+"u3eeqbzyiguwoqdkz4fb"
      },
      "15006" : {
        new: nflImageRoot+"ledqnhfinzff3i0j7vni"
      },
      "18575" : {
        new: nflImageRoot+"ow7mjmmy8xw7mmwlllzl"
      },
      "14988" : {
        new: nflImageRoot+"pjdiyojbnf8ywt3jg36u"
      },
      "13276" : {
        new: nflImageRoot+"vwrzeanheawwjrqabvcj"
      },
      "18566" : {
        new: nflImageRoot+"p0149bnhdc9orxsoiyvl"
      },
      "18683" : {
        new: nflImageRoot+"ocmacwswn8i1il9j6afp"
      },
      "18595" : {
        new: nflImageRoot+"tw68tp2j7yceuwip6trq"
      },
      "14513" : {
        new: nflImageRoot+"o2e4hfh4ttdcuzm62qrg"
      },
      "7075" : {
        new: nflImageRoot+"caovj6onwsoepaen8tjc"
      },
      "9923" : {
        new: nflImageRoot+"iecbkdfdgjbj0kegxftw"
      },
      "9911" : {
        new: nflImageRoot+"zcumaps42lo5sskklxcb"
      },
      "7965" : {
        new: nflImageRoot+"hl3rjmdutfmecf7bsibt"
      },
      "6891" : {
        new: nflImageRoot+"xqdutjfczs0x2c4bxkq8"
      },
      "18689" : {
        new: nflImageRoot+"dlqzehvv4dqmq3q8vt7q"
      },
      "6627" : {
        new: nflImageRoot+"qf8blphaa8cjoad9l3iq"
      },
      "18748" : {
        new: nflImageRoot+"ojaldunm4wsqio8ecyzl"
      },
      "6366" : {
        new: nflImageRoot+"npiwam7wg49no1d5bcfu"
      },
      "8086" : {
        new: nflImageRoot+"mjxi12jh15analtvesbl"
      },
      "5936" : {
        new: nflImageRoot+"rdtcovvvxsmag3er42um"
      },
      "7543" : {
        new: nflImageRoot+"siupf4yvtt6m2vo8eed9"
      },
      "6879" : {
        new: nflImageRoot+"z8mv5hn5s8kkxau1ynup"
      },
      "7630" : {
        new: nflImageRoot+"wdo99sm5z6hbtsna0scf"
      },
      "6629" : {
        new: nflImageRoot+"omwvlsalhbvn4mshgfcf"
      },
      "17114" : {
        new: nflImageRoot+"dlej3m2xoj81yretkm3r"
      },
      "6335" : {
        new: nflImageRoot+"hsj22mncpaqynxmt3xni"
      },
      "9945" : {
        new: nflImageRoot+"xv2vjalzhb6z9bevj0z9"
      },
      "14877" : {
        new: nflImageRoot+"qba2lspodqxe1uuttgz7"
      },
      "9834" : {
        new: nflImageRoot+"jpdzcfis6a3qmwyn7mbu"
      },
      "8377" : {
        new: nflImageRoot+"sd67wjznwou2pwqs2m3h"
      },
      "7013" : {
        new: nflImageRoot+"rfdif7ec0f3czwyeyfxq"
      },
      "6486" : {
        new: nflImageRoot+"sextvbehmeu7ydutxtsu"
      },
      "18561" : {
        new: nflImageRoot+"tr3yxhybdwehibl6maqy"
      },
      "19009" : {
        new: nflImageRoot+"qtjp84utne7uhgbtx0o5"
      },
      "19043" : {
        new: nflImageRoot+"ydu8lvszgayayddtnt44"
      },
      "18785" : {
        new: nflImageRoot+"bgflcfmqggmnfp35wvoi"
      },
      "18769" : {
        new: nflImageRoot+"dxtherbqeeqm21shpweo"
      },
      "18576" : {
        new: nflImageRoot+"dpo09k2ilcdrqbybirpa"
      },
      "18979" : {
        new: nflImageRoot+"rwyeph1ojfmkryt2egzk"
      },
      "18985" : {
        new: nflImageRoot+"jpy9l8osfm3yhvjwunur"
      },
      "18771" : {
        new: nflImageRoot+"z2clh7yjqbdklh5wsde6"
      },
      "6939" : {
        new: nflImageRoot+"hylws51towgdgtb3xuue"
      },
      "18641" : {
        new: nflImageRoot+"itfqdvyumc77u8clmczy"
      },
      "18774" : {
        new: nflImageRoot+"sz8fxixdgfp0v2urdpgt"
      },
      "16080" : {
        new: nflImageRoot+"sy4vnmwmotj4azsybhyt"
      },
      "14510" : {
        new: nflImageRoot+"ichrbyxroayfplnyshr4"
      },
      "18586" : {
        new: nflImageRoot+"hcuzgs2nio1jkprrxb8d"
      },
      "9832" : {
        new: nflImageRoot+"jqwqm12gfrwvnljq3zpz"
      },
      "9791" : {
        new: nflImageRoot+"ncyji5loojotez33t5uz"
      },
      "18757" : {
        new: nflImageRoot+"sxldzvwuh31gcmbiuavt"
      },
      "7656" : {
        new: nflImageRoot+"rf0zx5emnigq8zoewpmn"
      },
      "18843" : {
        new: nflImageRoot+"ruisuqsiiuufuwb9kzn4"
      },
      "18734" : {
        new: nflImageRoot+"gsci852t9zgfxblq9ukz"
      },
      "6294" : {
        new: nflImageRoot+"jifhhhjtzefcgnoph6jv"
      },
      "9772" : {
        new: nflImageRoot+"thhwhd13yrxfotpmg3mr"
      },
      "7609" : {
        new: nflImageRoot+"rnlbvr1luxvujvilpsja"
      },
      "10034" : {
        new: nflImageRoot+"fp5olqsgdbv5malqazzu"
      },
      "15416" : {
        new: nflImageRoot+"hj1o1fa6klumb7yozntc"
      },
      "13224" : {
        new: nflImageRoot+"oipjjzgdjyc5qstoo9zv"
      },
      "8544" : {
        new: nflImageRoot+"lazoen3ty3exj44grxbg"
      },
      "13386" : {
        new: nflImageRoot+"abkoyjrdrec9eub1pmzm"
      },
      "8728" : {
        new: nflImageRoot+"nozboqae26d3qrfbiarn"
      },
      "6908" : {
        new: nflImageRoot+"dvvx2eftodxk5qlhg4rl"
      },
      "9961" : {
        new: nflImageRoot+"ew3fzelndoialgn6a2ra"
      },
      "13466" : {
        new: nflImageRoot+"o7flzlafkwup1al6ujiw"
      },
      "8019" : {
        new: nflImageRoot+"fk3xbu2ah4c06vla1bhy"
      },
      "9743" : {
        new: nflImageRoot+"zi77vkqwrmklt5ic6lc6"
      },
      "9849" : {
        new: nflImageRoot+"n4tprmtnsgpc8cmvppvm"
      },
      "18593" : {
        new: nflImageRoot+"w2zhcr5cconyonvyhhbo"
      },
      "6926" : {
        new: nflImageRoot+"lgdqefi7aa9lqoxgf5ru"
      },
      "14713" : {
        new: nflImageRoot+"iduydmfnwwumvdkafogu"
      },
      "6560" : {
        new: nflImageRoot+"yorwzg4zr1putvxgtuzc"
      },
      "19016" : {
        new: nflImageRoot+"ztytuclbblkq43gzijpz"
      },
      "18613" : {
        new: nflImageRoot+"znpc5vhgni4lqh2sgrpg"
      },
      "16650" : {
        new: nflImageRoot+"zish1d1wbrhziswhsssd"
      },
      "18655" : {
        new: nflImageRoot+"ydp2awxxygyc17ugtmj3"
      },
      "6351" : {
        new: nflImageRoot+"u8glt8o1ugdzymmbkafr"
      },
      "9788" : {
        new: nflImageRoot+"i8be288cf78xhlwbawsm"
      },
      "18677" : {
        new: nflImageRoot+"bre8ysydjkevbfjzrs61"
      },
      "19004" : {
        new: nflImageRoot+"oebtmmy9ad0jdsct6hkr"
      },
      "8240" : {
        new: nflImageRoot+"dhettmtaamsu9qlepzzf"
      },
      "18652" : {
        new: nflImageRoot+"spnfy71tflcjc2vq3bnm"
      },
      "8550" : {
        new: nflImageRoot+"jwljhx516yyxd8lz0hdd"
      },
      "17113" : {
        new: nflImageRoot+"rhtskdfdsdkbhm8zn6pa"
      },
      "9572" : {
        new: nflImageRoot+"hkb5vin1uzghnf60njhm"
      },
      "12847" : {
        new: nflImageRoot+"uilaivgdhm6fgyz4ruwj"
      },
      "18643" : {
        new: nflImageRoot+"qatisluh7jkk6gbhz7hj"
      },
      "6130" : {
        new: nflImageRoot+"crnqcrkqwapmkzlsoora"
      },
      "18668" : {
        new: nflImageRoot+"gpz9zs474snz3jntrpbd"
      },
      "18670" : {
        new: nflImageRoot+"pfzlwlua7rh1kf3wv8iq"
      },
      "12606" : {
        new: nflImageRoot+"quvoqaapbnebbllg3jwl"
      },
      
    }

    this.NFLImages = {
      "18623": {
        firstName: "Clyde",
        lastName: "Edwards-Helaire",
        image: nflImageRoot+"ldgjalogqzti76pmqbw1"
      },
      "18688": {
        firstName: "Antonio",
        lastName: "Gibson",
        image: nflImageRoot+"cvmwtpfzdt0ibauqifup"
      },
      "18577": {
        firstName: "Joe",
        lastName: "Burrow",
        image: nflImageRoot+"alhbhd5ega2doxogh0dg"
      },
      "18640": {
        firstName: "Cam",
        lastName: "Akers",
        image: nflImageRoot+"zeh3myk7tc0yzp6qbudr"
      },
      "18603": {
        firstName: "D'Andre",
        lastName: "Swift",
        image: nflImageRoot+"amhsf13r1hnpo9lrn2uj"
      },
      "18849": {
        firstName: "James",
        lastName: "Robinson",
        image: nflImageRoot+"lxzbao36eeratekmnxeb"
      }, 
      "7575": {
        firstName: "Rob",
        lastName: "Gronkowski",
        image: nflImageRoot+"ldajm3cj1rs1sfwykyyk"
      }, 
      "18568": {
        firstName: "Zack",
        lastName: "Moss",
        image: nflImageRoot+"ung5uvdvstg3wgl9zdye"
      },
      "18895": {
        firstName: "Jordan",
        lastName: "Fuller",
        image: nflImageRoot+"krqfhhry1lbtx2acscmj"
      }, 
      "13411": {
        firstName: "John",
        lastName: "Johnson",
        image: nflImageRoot+"xwzn5lh2mhktocqcougu"
      },
      "18615": {
        firstName: "Jonathan",
        lastName: "Taylor",
        image: nflImageRoot+"mx6ptr3jbhx0wxo3848u"
      },
      "18631": {
        firstName: "Justin",
        lastName: "Herbert",
        image: nflImageRoot+"lrn52vly8xrfapbhw1ft"
      },
      "18594": {
        firstName: "Jerry",
        lastName: "Jeudy",
        image: nflImageRoot+"fvdnrep98wisgfokxqar"
      },
      "17023": {
        firstName: "Joey",
        lastName: "Slye",
        image: nflImageRoot+"xzlrapymjhwbanjcivlk"
      },
      "18588": {
        firstName: "CeeDee",
        lastName: "Lamb",
        image: nflImageRoot+"e8ftgnyivmkwtffd6tcr"
      },
      "18819": {
        firstName: "Rodrigo",
        lastName: "Blankenship",
        image: nflImageRoot+"j2z6mdwlye2gc4zhmc3g"
      },
      "18882": {
        firstName: "Joshua",
        lastName: "Kelley",
        image: nflImageRoot+"pkqsegmcbmbjlvwfzzl2"
      },
      "16038": {
        firstName: "Darrell",
        lastName: "Henderson",
        image: nflImageRoot+"nyjvyjkx6cb2a7lfxevg"
      },
      "18648": {
        firstName: "Justin",
        lastName: "Jefferson",
        image: nflImageRoot+"rbpfxph4wwkxnhphoat6"
      },
      "16254": {
        firstName: "Scott",
        lastName: "Miller",
        image: nflImageRoot+"knmpvvmftnvmqtx5g8me"
      },
      "18675": {
        firstName: "Brandon",
        lastName: "Aiyuk",
        image: nflImageRoot+"crkz9pxkba4o1zsmiazt"
      },
      "18635": {
        firstName: "Van",
        lastName: "Jefferson",
        image: nflImageRoot+"qszul9ttjj1mmboai4iu"
      },  
       
    }

     this.nflTeams = [
      {
        id: 48,
        bye: 11,
        defenseRankLs: 16,
        offenseRankLs: 17,
        city: "Buffalo",
        name: "Bills",
        twitter: "#BillsMafia",
        abbreviation: "BUF",

        homeVenue: {
          id: 46,
          name: "New Era Field"
        },
        teamColoursHex: [
          "#00338d",
          "#c60c30"
        ],
        officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/giphcy6ie9mxbnldntsf"
      },
      {
      id: 49,
      bye: 7,
      defenseRankLs: 6,
      offenseRankLs: 21,
      city: "Miami",
      name: "Dolphins",
      twitter: "#FinsUp",
      abbreviation: "MIA",

      homeVenue: {
      id: 59,
      name: "Hard Rock Stadium"
      },
      teamColoursHex: [
      "#008e97",
      "#fc4c02",
      "#005778"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/lits6p8ycthy9to70bnt"
      },
      {
      id: 50,
      bye: 5,
      defenseRankLs: 17,
      offenseRankLs: 27,
      city: "New England",
      name: "Patriots",
      abbreviation: "NE",
      twitter: "#GoPats",
      homeVenue: {
      id: 61,
      name: "Gillette Stadium"
      },
      teamColoursHex: [
      "#002244",
      "#c60c30",
      "#b0b7bc"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/moyfxx3dq5pio4aiftnc"
      },
      {
      id: 51,
      bye: 10,
      defenseRankLs: 24,
      offenseRankLs: 32,
      city: "New York",
      name: "Jets",
      twitter: "#TakeFlight",
      abbreviation: "NYJ",
      homeVenue: {
      id: 63,
      name: "MetLife Stadium"
      },
      teamColoursHex: [
      "#125740",
      "#000000",
      "#ffffff"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ekijosiae96gektbo4iw"
      },
      {
      id: 52,
      bye: 10,
      defenseRankLs: 32,
      offenseRankLs: 7,
      city: "Dallas",
      name: "Cowboys",
      twitter: "#DallasCowboys",
      abbreviation: "DAL",
      homeVenue: {
      id: 51,
      name: "AT&T Stadium"
      },
      teamColoursHex: [
      "#003594",
      "#041e42",
      "#869397",
      "#7f9695",
      "#ffffff"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ieid8hoygzdlmzo0tnf6"
      },
      {
      id: 53,
      bye: 11,
      defenseRankLs: 11,
      offenseRankLs: 31,
      city: "New York",
      name: "Giants",
      twitter: "#TogetherBlue",
      abbreviation: "NYG",
      homeVenue: {
      id: 63,
      name: "MetLife Stadium"
      },
      teamColoursHex: [
      "#0b2265",
      "#a71930",
      "#a5acaf"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/t6mhdmgizi6qhndh8b9p"
      },
      {
      id: 54,
      bye: 9,
      defenseRankLs: 19,
      offenseRankLs: 25,
      city: "Philadelphia",
      name: "Eagles",
      twitter: "#FlyEaglesFly",
      abbreviation: "PHI",
      homeVenue: {
      id: 65,
      name: "Lincoln Financial Field"
      },
      teamColoursHex: [
      "#004c54",
      "#a5acaf",
      "#acc0c6",
      "#000000",
      "#565a5c"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/puhrqgj71gobgdkdo6uq"
      },
      {
      id: 55,
      bye: 8,
      defenseRankLs: 15,
      offenseRankLs: 28,
      city: "Washington",
      name: "Washington",
      twitter: "#WashingtonFootball",
      abbreviation: "WAS",
      homeVenue: {
      id: 73,
      name: "FedEx Field"
      },
      teamColoursHex: [
      "#773141",
      "#ffb612"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/f_auto/league/ywoi3t4jja8fokqpyegk"
      },
      {
      id: 56,
      bye: 7,
      defenseRankLs: 1,
      offenseRankLs: 23,
      city: "Baltimore",
      name: "Ravens",
      twitter: "#RavensFlock",
      abbreviation: "BAL",
      homeVenue: {
      id: 45,
      name: "M&T Bank Stadium"
      },
      teamColoursHex: [
      "#241773",
      "#000000",
      "#9e7c0c",
      "#c60c30"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ucsdijmddsqcj1i9tddd"
      },
      {
      id: 57,
      bye: 9,
      defenseRankLs: 23,
      offenseRankLs: 22,
      city: "Cincinnati",
      name: "Bengals",
      twitter: "#SEIZETHEDEY",
      abbreviation: "CIN",
      homeVenue: {
      id: 49,
      name: "Paul Brown Stadium"
      },
      teamColoursHex: [
      "#fb4f14",
      "#000000"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/okxpteoliyayufypqalq"
      },
      {
      id: 58,
      bye: 9,
      defenseRankLs: 20,
      offenseRankLs: 14,
      city: "Cleveland",
      name: "Browns",
      twitter: "#Browns",
      abbreviation: "CLE",
      homeVenue: {
      id: 50,
      name: "FirstEnergy Stadium"
      },
      teamColoursHex: [
      "#311d00",
      "#ff3c00",
      "#ffffff"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/grxy59mqoflnksp2kocc"
      },
      {
      id: 59,
      bye: 4,
      defenseRankLs: 2,
      offenseRankLs: 16,
      city: "Pittsburgh",
      name: "Steelers",
      twitter: "#HereWeGo",
      abbreviation: "PIT",
      homeVenue: {
      id: 66,
      name: "Heinz Field"
      },
      teamColoursHex: [
      "#ffb612",
      "#101820",
      "#003087",
      "#c60c30",
      "#a5acaf"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/xujg9t3t4u5nmjgr54wx"
      },
      {
      id: 60,
      bye: 11,
      defenseRankLs: 8,
      offenseRankLs: 30,
      city: "Chicago",
      name: "Bears",
      twitter: "#DaBears",
      abbreviation: "CHI",
      homeVenue: {
      id: 48,
      name: "Soldier Field"
      },
      teamColoursHex: [
      "#0b162a",
      "#c83803"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ra0poq2ivwyahbaq86d2"
      },
      {
      id: 61,
      bye: 5,
      defenseRankLs: 22,
      offenseRankLs: 19,
      city: "Detroit",
      name: "Lions",
      twitter: "#OnePride",
      abbreviation: "DET",
      homeVenue: {
      id: 53,
      name: "Ford Field"
      },
      teamColoursHex: [
      "#0076b6",
      "#b0b7bc",
      "#000000",
      "#ffffff"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ocvxwnapdvwevupe4tpr"
      },
      {
      id: 62,
      bye: 5,
      defenseRankLs: 26,
      offenseRankLs: 4,
      city: "Green Bay",
      name: "Packers",
      abbreviation: "GB",
      twitter: "#GoPackGo",
      homeVenue: {
      id: 54,
      name: "Lambeau Field"
      },
      teamColoursHex: [
      "#203731",
      "#ffb612"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gppfvr7n8gljgjaqux2x"
      },
      {
      id: 63,
      bye: 7,
      defenseRankLs: 30,
      offenseRankLs: 15,
      city: "Minnesota",
      name: "Vikings",
      twitter: "#Skol",
      abbreviation: "MIN",
      homeVenue: {
      id: 141,
      name: "US Bank Stadium"
      },
      teamColoursHex: [
      "#4f2683",
      "#ffc62f"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/teguylrnqqmfcwxvcmmz"
      },
      {
      id: 64,
      bye: 8,
      defenseRankLs: 31,
      offenseRankLs: 18,
      city: "Houston",
      name: "Texans",
      twitter: "#WeAreTexans",
      abbreviation: "HOU",
      homeVenue: {
      id: 55,
      name: "NRG Stadium"
      },
      teamColoursHex: [
      "#03202f",
      "#a71930"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/bpx88i8nw4nnabuq0oob"
      },
      {
      id: 65,
      bye: 7,
      defenseRankLs: 3,
      offenseRankLs: 24,
      city: "Indianapolis",
      name: "Colts",
      twitter: "#ForTheShoe",
      abbreviation: "IND",
      homeVenue: {
      id: 56,
      name: "Lucas Oil Stadium"
      },
      teamColoursHex: [
      "#002c5f",
      "#a2aaad"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ketwqeuschqzjsllbid5"
      },
      {
      id: 66,
      bye: 8,
      defenseRankLs: 29,
      offenseRankLs: 26,
      city: "Jacksonville",
      name: "Jaguars",
      twitter: "#DUUUVAL",
      abbreviation: "JAX",
      homeVenue: {
      id: 57,
      name: "TIAA Bank Field"
      },
      teamColoursHex: [
      "#101820",
      "#d7a22a",
      "#9f792c",
      "#006778"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/qycbib6ivrm9dqaexryk"
      },
      {
      id: 67,
      bye: 4,
      defenseRankLs: 10,
      offenseRankLs: 3,
      city: "Tennessee",
      name: "Titans",
      twitter: "#Titans",
      abbreviation: "TEN",
      homeVenue: {
      id: 72,
      name: "Nissan Stadium"
      },
      teamColoursHex: [
      "#0c2340",
      "#418fde",
      "#c8102e",
      "#8a8d8f",
      "#a2aaad",
      "#54585a"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/pln44vuzugjgipyidsre"
      },
      {
      id: 68,
      bye: 10,
      defenseRankLs: 27,
      offenseRankLs: 13,
      city: "Atlanta",
      name: "Falcons",
      twitter: "#RiseUpATL",
      abbreviation: "ATL",
      homeVenue: {
      id: 62,
      name: "Mercedes-Benz Stadium"
      },
      teamColoursHex: [
      "#a71930",
      "#000000",
      "#a5acaf"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/d8m7hzpsbrl6pnqht8op"
      },
      {
      id: 69,
      bye: 13,
      defenseRankLs: 21,
      offenseRankLs: 20,
      city: "Carolina",
      name: "Panthers",
      twitter: "#KeepPounding",
      abbreviation: "CAR",
      homeVenue: {
      id: 47,
      name: "Bank of America Stadium"
      },
      teamColoursHex: [
      "#0085ca",
      "#101820",
      "#bfc0bf"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ervfzgrqdpnc7lh5gqwq"
      },
      {
      id: 70,
      bye: 6,
      defenseRankLs: 25,
      offenseRankLs: 9,
      city: "New Orleans",
      name: "Saints",
      abbreviation: "NO",
      twitter: "#Saints",
      homeVenue: {
      id: 142,
      name: "Mercedes-Benz Superdome"
      },
      teamColoursHex: [
      "#d3bc8d",
      "#101820"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/grhjkahghjkk17v43hdx"
      },
      {
      id: 71,
      bye: 13,
      defenseRankLs: 4,
      offenseRankLs: 6,
      city: "Tampa Bay",
      name: "Buccaneers",
      abbreviation: "TB",
      twitter: "#GoBucs",
      homeVenue: {
      id: 71,
      name: "Raymond James Stadium"
      },
      teamColoursHex: [
      "#d50a0a",
      "#ff7900",
      "#0a0a08",
      "#b1babf",
      "#34302b"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/szwmxcasfizlkkfn5zwq"
      },
      {
      id: 72,
      bye: 5,
      defenseRankLs: 14,
      offenseRankLs: 29,
      city: "Denver",
      name: "Broncos",
      twitter: "#BroncosCountry",
      abbreviation: "DEN",
      homeVenue: {
      id: 52,
      name: "Broncos Stadium at Mile High"
      },
      teamColoursHex: [
      "#fb4f14",
      "#002244"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/t0p7m5cjdjy18rnzzqbx"
      },
      {
      id: 73,
      bye: 10,
      defenseRankLs: 12,
      offenseRankLs: 5,
      city: "Kansas City",
      name: "Chiefs",
      abbreviation: "KC",
      twitter: "#ChiefsKingdom",
      homeVenue: {
      id: 58,
      name: "Arrowhead Stadium"
      },
      teamColoursHex: [
      "#e31837",
      "#ffb81c"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ujshjqvmnxce8m4obmvs"
      },
      {
      id: 74,
      bye: 6,
      defenseRankLs: 28,
      offenseRankLs: 12,
      city: "Las Vegas",
      name: "Raiders",
      abbreviation: "LV",
      twitter: "#RaiderNation",
      homeVenue: {
      id: 64,
      name: "RingCentral Coliseum"
      },
      teamColoursHex: [
      "#000000",
      "#a5acaf"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Raiders"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gzcojbzcyjgubgyb6xf2"
      },
      {
      id: 75,
      bye: 6,
      defenseRankLs: 18,
      offenseRankLs: 8,
      city: "Los Angeles",
      name: "Chargers",
      twitter: "#BoltUp",
      abbreviation: "LAC",
      homeVenue: {
      id: 140,
      name: "StubHub Center"
      },
      teamColoursHex: [
      "#002a5e",
      "#ffc20e",
      "#0080c6"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/lu22ddatqbdknq4wuazd"
      },
      {
      id: 76,
      bye: 8,
      defenseRankLs: 7,
      offenseRankLs: 2,
      city: "Arizona",
      name: "Cardinals",
      twitter: "#RedSea",
      abbreviation: "ARI",
      homeVenue: {
      id: 43,
      name: "State Farm Stadium"
      },
      teamColoursHex: [
      "#97233f",
      "#000000",
      "#ffb612"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/u9fltoslqdsyao8cpm0k"
      },
      {
      id: 77,
      bye: 9,
      defenseRankLs: 5,
      offenseRankLs: 11,
      city: "Los Angeles",
      name: "Rams",
      abbreviation: "LA",
      twitter: "#RamsHouse",
      homeVenue: {
      id: 74,
      name: "Los Angeles Memorial Coliseum"
      },
      teamColoursHex: [
      "#002244",
      "#866d4b",
      "#ffffff"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/rvmujtvvqlhlviuwafzg"
      },
      {
      id: 78,
      bye: 11,
      defenseRankLs: 9,
      offenseRankLs: 10,
      city: "San Francisco",
      name: "49ers",
      abbreviation: "SF",
      twitter: "#FTTB",
      homeVenue: {
      id: 68,
      name: "Levi's Stadium"
      },
      teamColoursHex: [
      "#aa0000",
      "#b3995d"
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/dxibuyxbk0b9ua5ih9hn"
      },
        {
          id: 79,
          bye: 6,
          defenseRankLs: 13,
          offenseRankLs: 1,
          city: "Seattle",
          name: "Seahawks",
          twitter: "#Seahawks",
          abbreviation: "SEA",
          homeVenue: {
          id: 69,
          name: "CenturyLink Field"
          },
          teamColoursHex: [
          "#002244",
          "#69be28",
          "#a5acaf"
          ],
          officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gcytzwpjdzbpwnwxincg"
        }
      ]

    

    
  }

  public getWeekTimes() {
    return this.weekTimes;
  }

  public getNFLImages() {
    return this.NFLImages;
  }

  public getRepImages() {
    return this.replaceImg;
  }

  public getNFLTeams() {
    return this.nflTeams;
  }

  public colorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }
    return rgb;
  }

  public teamInfo(array, teams) {
    for (let team of teams) {
      for (let data of array) { 
        if (data.player['currentTeam'] != null 
        && team['id'] === data.player['currentTeam'].id 
        && data.player['currentTeam'].id === data.team.id 
        || data.player['currentTeam'] != null  && team['id'] === data.player['currentTeam'].id) {
          data.team.logo = team['officialLogoImageSrc'];
          data.team.city = team['city'];
          data.team.name = team['name'];
          data.team.abbreviation = team['abbreviation'];
          data.team.twitter = team['twitter'] ? team['twitter'] : '';
          data.player.twitterHandle = team['twitter'] ? team['twitter'] : '';
        }
      }
    }
  }

  public removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function(x) {  
        var key = keyFn(x), isNew = !mySet.has(key);
        if (isNew) mySet.add(key);  
        return isNew;
    });
  }

  public teamRecord(teams, players, update, date) {
    for (let team of teams) {
      for (let data of players) { 
        if (data.team.opponentId != null && 
          data.team.id === team.team.id) {
          data.win = team.stats.standings.wins;
          data.loss = team.stats.standings.losses;
          data.otl = team.stats.standings.overtimeLosses;
        } else if (data.player.lineupTeam === team.team.abbreviation) { 
          data.win = team.stats.standings.wins;
          data.loss = team.stats.standings.losses;
          data.otl = team.stats.standings.overtimeLosses;
        }
      }  
    }
  }
  
  public round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  public tomorrow(date, day) {
    let days = 1;
    if (day) {
      date = new Date();
      days = 1;
    } else {
      days = 2;
    }
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + days);
    tomorrow.setHours(tomorrow.getHours() - 8);
    return new Date(tomorrow);
  }

  public formatTime(time) {
    // let utcDate = null;
    // let startDate = null
    // utcDate = new Date(time);
    // startDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    return new Date(time);
  }

  public updatePlayers(info, players, teams) {
    for (let n of info) {
      for (let old of players) {
        if (old.player['currentTeam'] != null)
          old.player['currentTeam'].lastYearTeamId = old.player['currentTeam'] != null ? old.player['currentTeam'].id : 0;
        if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
          if (old.player['currentTeam'] != null)
            old.player['currentTeam'].id = n['teamAsOfDate'].id;
          else if (old.player['currentTeam'] == null)
            old.player['currentTeam'] = {id: n['teamAsOfDate'].id};
          old.team.id = n['teamAsOfDate'].id;
        } 
        
      }
    }
    this.teamInfo(players, teams);
  }
}
