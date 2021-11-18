# Starting NHL Goalies and NBA Starters Angular 12 MySportsFeeds API, Heroku - <a href="https://www.fantasy-sports-resources.com">Demo</a> 
This is a single page app which uses the [MySportsFeeds API](https://www.mysportsfeeds.com/data-feeds/api-docs/#) to get starting NHL goalie data. 

### Description
This [application](https://nhl-starting-goalies-angular.herokuapp.com/) is made with Angular (version 12.2.4) and the most current version of angular material2. This SPA app is hosted for free on Heroku (cloud application platform). The data is sourced through the [MySportsFeeds API](https://www.mysportsfeeds.com/data-feeds/api-docs/#).

This app can help explain how to fetch data using [Angular's HttpClient Module](https://angular.io/guide/http) from a robust api.  

### You can learn this
* Create user authentication on firebase.
* Get realtime data updates from firebase. 
* Use twitter API to get player updates.   
* [Use the HttpClient module to connect to an api and get data returned in milliseconds.](https://www.ianposton.com/angular4-httpclient/)
* [Deploy an Angular 12 app to Heroku.](https://www.ianposton.com/angular4-deploy-to-heroku/) 
* Encrypy/Decrypt heroku config vars with Crypto-js.

### Software used for this application
* Angular (version 12.2.4) 
* Angular CLI (version 12.2.4)
* Node.js (version 14.7.5)    
* Heroku [Set up a free account ](https://www.heroku.com/)
* [Firebase](https://firebase.google.com/) (version 7.16.1) 
* @angular/fire (version 6.0.2)
* NPM (version 7.21.1)
* rxjs (version 7.6.0)
* [MySportsFeeds API](https://www.mysportsfeeds.com/data-feeds/api-docs/#)
* [Crypto-js](https://github.com/brix/crypto-js) (version 4.0.0)

### Clone and serve this app
* First you will need to be given access MySportsFeeds endpoints. As a developer working on a non-commercial app you can be given access to the endpoints. Let MSF that you are working on a non-commercial project and they will send you an api token. Sign up at MySportsFeeds and use the api token in the header request to authenticate the api get request. `let headers = new HttpHeaders().set("Authorization", "Basic " + btoa(apiToken + ":" + 'MYSPORTSFEEDS'));`
* When the api headers are in place clone this repo and run <code>npm install</code> then run <code>ng serve</code> to serve the app on `localhost:4200`. Be careful not to push your api password to github.

### Create user authentication with firebase
The purpose of this app is to show each days confirmed starting NHL goalies. The api provides a best guess and the actual starter does not get updated to until well into game time. This created a lot of false data being represented on this app. I created a system of indicators that work with a Boolean. If a NHl goalie is a guess then I will show an orange expected indicator in my app next to the goalie, if the NHL goalie has been confirmed by his team I will show a green confirmed indicator next to the goalie. 

Since I could not rely on the api to update a confirmed starting goalie fast enough I needed to source my own data and and update the goalie's starting status manually. This means I made my own goalie json file and synced it to the api using each goalies ID. I added an expected and confirmed attribute to each goalie when the app loads. Now I can update those attributes on the ng-model of each goalie and save it to my firebase db. This will get me quicker updates and avoid showing false data by overriding the returned data from the api. 

I created a small cms to allow me to update the goalies status by clicking on their image to toggle true or false. I created a view that can only be accessed by me so that a random user wouldn't be able to make un-wanted changes to my app. In order to lock off this cms admin zone just for me I used firebase to create a special user authentication token. If I use the correct name and password my cms will appear and I can make quick updates right in the view where I want to see them.

* Create a firebase user by going to your firebase console and in the side nav under Develop click on the <code>Authentication</code> option. 
* In Authentication go to the SIGN-IN METHOD tab and enable Email/Password. 
* Then click on USERS tab and click ADD USER button. Enter an email and password.
* [Set up firebase in angular4 app](https://www.ianposton.com/angular4-with-firebase-mysportsfeeds-api-part-3/) (follow first part of this link). 
* Make a firbase service to handle saving data and retrieving data from the db. 

```ts
  
  //firebase.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class FirebaseService {

  items: any;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public af: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
    this.items = af.list('/items').valueChanges(); 
    this.user = firebaseAuth.authState;

      this.user.subscribe(
          (user) => {
            if (user) {
              this.userDetails = user;
            }
            else {
              this.userDetails = null;
            }
          }
        );
    
  }

 signInRegular(email, password) {
   const credential = firebase.auth.EmailAuthProvider.credential( email, password );
   return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
 }


  logout() {
    this.firebaseAuth.auth.signOut();
  }


  getData() {
    console.log('getting starter data from firebase...');
    return this.items = this.af.list('/items').valueChanges();
  }
}


```

* Include the firbase service in the app.module.ts in providers. 
* Define the user model in the app.component.ts, create a function and call the function from the html form.

```ts

//app.component.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //User Model
  user = {
    email: '',
    password: ''
  };
  
  constructor(private fbService: FirebaseService){}

  public signInWithEmail() {
    this.fbService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        //success
      })
      .catch((err) => console.log('error: ' + err));
  }


  ngOnInit() {
     
    
  }

}

```

```html

<!-- app.component.html -->

<div class="login-container">
 
  <input type="email" class="form-control" [(ngModel)]="user.email" placeholder="Email" required>
  
  <input type="password" class="form-control" [(ngModel)]="user.password" placeholder="Password" required>

  <button (click)="signInWithEmail()">Login</button>

</div> 

```

The key here is in the firebase service <code>this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)</code> This specifically talks to firebase. If the email and password are correct firebase will return a user object and it can be detected from the firebase service and can be used to show/hide add/edit/delete data features in the client. Using the same html form I can use <code>fbService.userDetails</code> to hide the log in form and show the log out button to end the session. 

```html

<!-- app.component.html -->

<div class="login-container" *ngIf="fbService.userDetails == null">
 
  <input type="email" class="form-control" [(ngModel)]="user.email" placeholder="Email" required>
  
  <input type="password" class="form-control" [(ngModel)]="user.password" placeholder="Password" required>

  <button (click)="signInWithEmail()">Login</button>

</div> 

 
<div *ngIf="fbService.userDetails != null">
 <button (click)="fbService.logout()">Logout</button>
</div>

```

In the next article I will expand a bit more on how to use the user authentication to create an admin area to edit data and update the view in realtime without refreshing the page.

### Get realtime data updates from firebase.

I created a small cms to allow me to update the status of my data by clicking on a image to toggle true or false. I created a view that can only be accessed by an authenticated user so that a random user wouldn't be able to make un-wanted changes to my app. I also adjusted my firebase db rules to only allow write access if authenticated. In order to lock off this cms admin zone just for me I used firebase to create a special user authentication token. If I use the correct email and password that I setup when I added a user to my db, my cms will appear and I can make quick updates right in the view where I want to see them.

* In your firebase db dashboard set db rules to only allow write access if authenticated. Click the RULES tab and add this block of code. 

```js 

{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}

```

* Use the <code>ngIf="fbService.userDetails != null"</code> to show/hide html. Follow instructions above to setup authentication. 

```html

<!-- app.component.html -->

<div *ngIf="fbService.userDetails != null">
  <div class="edit-list-container" *ngIf="fullFirebaseResponse != null">
   
    
    <ul>
     
      <li *ngFor="let group of myData">
        <ul>
          <li *ngFor="let goalie of allGoalies">

            <span *ngIf="goalie[group.player.ID] != null" (click)="goalie[group.player.ID].probable = !goalie[group.player.ID].probable" [(ngModel)]="allGoalies[0][group.player.ID].probable" ngDefaultControl>
            <img src="{{group.player.image}}" alt="">{{group.player.LastName}}</span>

            <span *ngIf="goalie[group.player.ID] != null && goalie[group.player.ID].probable === false" style="color: red">X</span>

            <span *ngIf="goalie[group.player.ID] != null && goalie[group.player.ID].probable === true && goalie[group.player.ID].confirmed === false" (click)="goalie[group.player.ID].confirmed = !goalie[group.player.ID].confirmed" [(ngModel)]="allGoalies[0][group.player.ID].confirmed" ngDefaultControl style="color: orange;">Probable</span>

            <span *ngIf="goalie[group.player.ID] != null && goalie[group.player.ID].probable === true && goalie[group.player.ID].confirmed === true" (click)="goalie[group.player.ID].confirmed = !goalie[group.player.ID].confirmed" [(ngModel)]="allGoalies[0][group.player.ID].confirmed" ngDefaultControl style="color: green;">Confirmed</span>

            <span *ngIf="goalie[group.player.ID] != null">({{group.stats.stats.Wins['#text'] + '-' + group.stats.stats.Losses['#text'] + '-' + group.stats.stats.OvertimeLosses['#text']}})</span>

          </li>
        </ul>
      </li>

    </ul>

    <div>
      <button (click)="save()">Save</button>
    </div>

</div> <!-- END OF AUTHENTICATED ADIM AREA -->

<div *ngFor="let data of showData"> <!-- LIVE VIEW -->
  <span class="player-img"><img src="{{ data.player.image }}"></span> <br>
  <span>{{ data.player.FirstName + ' ' + data.player.LastName }}</span> <br>

  <span *ngIf="fullFirebaseResponse != null && allGoalies[0][data.player.ID] && allGoalies[0][data.player.ID].confirmed === true" style="color: green;">confirmed</span>

   <span *ngIf="fullFirebaseResponse != null && allGoalies[0][data.player.ID] != null && allGoalies[0][data.player.ID].confirmed === false && data.player.startingTodayNow === false" style="color: orange;">expected</span>

</div>
 
```

The idea here is I am using nested `ngFor` loops to access the data by player ID's. The cms is designed to update the true/false values of the player's status by clicking on player image and then clicking the status to toggle its value. Once status is set click save to run a function to save and update firebase data. 

```json

//firebase data

{"Starters": 
  [

    {

      "5176":
      {
        "confirmed": false,
        "probable": false,
        "name": "Philip Grubauer"
      },
      "4863":
      {
        "confirmed": true,
        "probable": true,
        "name": "Braden Holtby"
      },
      "5122":
      {
        "confirmed": false,
        "probable": false,
        "name": "Martin Jones"
      }

    }

  ]
}

```

```ts

//app.component.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http'
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  allGoalies: Array <any>;
  fullFirebaseResponse: any;
  
  constructor(private http: HttpClient, private fbService: FirebaseService){
    this.fbService
      .getStarterData()
      .subscribe(res => {

        if (res[0] != null) {
          console.log(res[0], 'got response from firebase...');
          this.fullFirebaseResponse = res[0];
          this.allGoalies = Array.of(res[0][0]);
        }

      })

   // USING MYDATA FROM API TO MATCH IDS WITH CUSTOM FIREBASE DATA
  // USE WITH NESTED NGFOR IN HTML
  this.http.get('https://some.fake.datafeed.com/v1/players')
      .subscribe(res => {
         this.myData = res['cumulativeplayerstats'].playerstatsentry;
      })
  }

 


  ngOnInit() {
     
    
  }

  public save() {

    this.fbService
      .addData(this.fullFirebaseResponse);
     
  }

}

```

I want to point out you may notice I am using brackets to locate my data from the firebase response. This is because this is the way I have designed my data. If your data happens to be different it is not a big deal just adjust where in the res your data lives. For example <code>this.allGoalies = Array.of(res[0][0]);</code> here I am taking the firebase response and asking for the first item in this array and then asking for the first item in that array which is a nested array. Then I am wrapping it in `Array.of` so that it can be processed by `ngFor` in the view.

The `this.fullFirebaseResponse` will keep track of the player status updates as I am using `[(ngModel)]="allGoalies[0][group.player.ID].confirmed"` in the html. `ngModel` has a lengthy description but basically when you want to update data in realtime `ngModel` must exist on the input. In my case I am using a `<span>` tag to track clicks and changes to the data model, for this you will need to add `ngDefaultControl` to the input to avoid angular throwing errors. 

```ts


  //firebase.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class FirebaseService {

  items: any;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public af: AngularFireDatabase, private firebaseAuth: AngularFireAuth) {
    this.items = af.list('/items').valueChanges(); 
    
    ...
    
  }

...

addData(starters) {
    console.log(starters, 'starters.json in fb service...');
    console.log('deleting data from fb...');
    this.af.list('/items').remove().then(_ => {
      console.log('deleted!');
      this.getStarterData();
    });
    console.log('saving new data to fb...');
    this.af.list('/items').push(starters); 
}


  getData() {
    console.log('getting starter data from firebase...');
    return this.items = this.af.list('/items').valueChanges();
  }
}

``` 

When click save and I call `this.fbService.addData(this.fullFirebaseResponse)` I am passing in the updated firebase response.

**WARNING: First I ask firebase to delete my entire database before saving it again. This is why I am checking `if (res[0] != null)` in my app.component.ts to avoid errors if the new firebase response isn't ready for my view when I ask for it again. I say warning because if you have important data and you have not saved a copy for backup this approach could cause error and you might lose all your data.**

A better approach is to update each item in your data one by one.

For my app I am making updates all the time to a lot of players and this approach works for me by removing everything and making a new db. My data isn't that large so the process is quick. However, I saved backups of my data to my desktop by selecting the export feature from the firebase dropdown menu incase something goes wrong.  

The best thing is as soon as I do this Firebase pulls in the new data to the view my angular component constructor function is hot and watches the change and anyone using this app will see the change without having to refresh the view like magic. I have an app live on heroku and I have made changes to my firebase db and seen the data change realtime on other devices to test this theory. It's a great user experience!

### Clone and serve this app
* First you will need to be given access MySportsFeeds endpoints. As a developer working on a non-commercial app you can be given access to the api endpoints. Sign up at MySportsFeeds and use the username and password in the header request to authenticate the api get request. `let headers = new HttpHeaders().set("Authorization", "Basic " + btoa(apiKey + ":" + 'MYSPORTSFEEDS'));`
* When the api headers are in place clone this repo and run <code>npm install</code> then run <code>ng serve</code> to serve the app on `localhost:4200`. Be careful not to push your `apiKey` to github.

### Get data from api with HttpClient module
This is for sports stats lovers trying to build something with the latest angular framework. This article will show you how to get started using Angular 9 with the MySportsFeed API. 

I will fetch a list of NBA players, filter the response and sort the NBA players with the highest point total.

You will learn
* Make an api request with the HttpClient Module
* Filter the api response
* Display the data 

First you will need to be given access MySportsFeeds endpoints. As a developer working on a non-commercial app you can be given access to the endpoints. Let MSF know that you are working on a non-commercial project and they will send you an api token. Sign up at [MySportsFeeds](https://www.mysportsfeeds.com) and use the api token in the header request to authenticate the api get request. `let headers = new HttpHeaders().set("Authorization", "Basic " + btoa(apiToken + ":" + 'MYSPORTSFEEDS'));`

The first thing I want to do in this app is get a list of all the active NBA players and their current season stats. I used the [MySportsFeeds API Documentation](https://www.mysportsfeeds.com/data-feeds/api-docs/#) to find the correct endpoint to get NBA player stats for 2019-2020. I am able to use Angular's [HttpClient](https://angular.io/guide/http) module to send a GET request for data using this endpoint `https://api.mysportsfeeds.com/v2.1/pull/nba/2019-2020-regular/player_stats_totals.json?position=PG,SG,SF,PF,C` found in the api's documentation. 

This api request will send 718 items which is a rather large payload especially for the ui. I will filter the response with javascript so that I will only have relative NBA players before I define the array for the ui. I can use the `gamesPlayed` data attribute to remove irrelevant players from the array.

```ts

//app.component.ts 

import { Component, OnInit  } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';

let headers = new HttpHeaders().set("Authorization", "Basic " + btoa(apiToken + ":" + 'MYSPORTSFEEDS'));
let url = 'https://api.mysportsfeeds.com/v2.1/pull/nba/2019-2020-regular/player_stats_totals.json?position=PG,SG,SF,PF,C';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
   
   public nbaData: Array<any>;

   constructor(private http: Http) {}

   loadData() {
    this.http.get(url, {headers})
      .subscribe(res => {
        console.log(res['playerStatsTotals'], 'NBA players and stats');
        this.nbaData = res['playerStatsTotals'].filter(
          player => player.stats != null && player.stats.gamesPlayed > 5);
      });
   }

   ngOnInit() {
    loadData();
   }
}

```

```html

//app.component.html

 <div class="card" *ngIf="nbaData != null">
   <h2>Points</h2>
   <div *ngFor="let item of nbaData">
     <img src="{{item?.player?.officialImageSrc}}" alt="basketball player">
     {{ item.player.firstName + ' ' + item.player.lastName}} - {{item?.player?.primaryPosition}} | #{{item.player.jerseyNumber}} {{item?.stats?.offense?.pts}} Pts
   </div>
 </div>

```

```scss

//app.component.scss
.card {
  width: 33%;
  margin: 20px;
  padding: 20px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}


```

This will produce a very long list of players and their point total on the season. I am showing my list of players inside a simple card. In the next part I will sort the list from most points to least and I will set up a simple pagination to make the list easier to read.

### Sort data for ui with a custom pipe
Ok, we left off with a very long list NBA players with a large player image. I want to do a few things here.

Things TODO
* Sort the order of the list
* Show top 20
* Paginate next 20
* Style the list 

To help me sort the players by their point totals I am going to use angular cli to generate a pipe. I can add some code in the pipe that will sort my data from most points to least. Then I will add the pipe to the `*ngFor` directive. I run `ng g pipe orderby` in the root of my angular app. I enhence the html by adding the pipe `<div *ngFor="let item of nbaData | orderBy: 'nbaPts'; let i=index">`. I am using the index to show the number order in the list.

I want to make the list shorter and only show the top 20 players. There are a few ways to do this, but I am using `[ngClass]` to pull this off. First I'll create a css class `.dn {display: none;}` and then update the html `<span [ngClass]="{'content' : i<=19, 'dn' : i>19}">`. I am wrapping the player info with a span. The index is binary so if the index is less than or equal to 19 apply a class if the index is greater than 19 display none. This will show the top 20 players and hide the rest.

Now it would be nice to show more players after the top 20. I can define some variables in the controller and use a button click event to paginate next. The default will be `public page: number = 19;` and `public amount: number = -1;` to show the top 20. I can use a button to change the values on click `<button (click)="page = 19; amount = -1">1 - 20</button> &nbsp;&nbsp; <button (click)="page = 39; amount = 19">21 - 40</button>`. This will allow me to toggle between 1 - 20 to 21 - 40.

```ts

//orderby.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {
 
  transform(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (field === 'nbaPts') {
          if (a['stats'].offense.pts >= b['stats'].offense.pts) {
            return -1;
          } else if (a['stats'].offense.pts <= b['stats'].offense.pts) {
            return 1;
          } else {
            return 0;
          }
      }
    })
  }

}


```
 

```ts

//app.component.ts 

import { Component, OnInit  } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';

let headers = new HttpHeaders().set("Authorization", "Basic " + btoa(apiToken + ":" + 'MYSPORTSFEEDS'));
let url = 'https://api.mysportsfeeds.com/v2.1/pull/nba/2019-2020-regular/player_stats_totals.json?position=PG,SG,SF,PF,C';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
   
   public nbaData: Array<any>;
   public page: number = 19;
   public amount: number = -1;

   constructor(private http: Http) {}

   loadData() {
    this.http.get(url, {headers})
      .subscribe(res => {
        console.log(res['playerStatsTotals'], 'NBA players and stats');
        this.nbaData = res['playerStatsTotals'].filter(
          player => player.stats != null && player.stats.gamesPlayed > 5);
      });
   }

   ngOnInit() {
    loadData();
   }
}

```

```html

//app.component.html

<div>
  <button (click)="page = 19; amount = -1">1 - 20</button> &nbsp;&nbsp; <button (click)="page = 39; amount = 19">21 - 40</button>
</div>

 <div class="card" *ngIf="nbaData != null">
   <h2>Points</h2>
   <div *ngFor="let item of myData | orderBy: 'nbaPts'; let i=index">
     <span [ngClass]="{'content' : i<=page, 'dn' : i>page || i<=amount}">
       {{i + 1}} 
       <img src="{{item?.player?.officialImageSrc}}" alt="basketball player">
       {{ item.player.firstName + ' ' + item.player.lastName}} - {{item?.player?.primaryPosition}} | #{{item.player.jerseyNumber}} {{item?.stats?.offense?.pts}} Pts
     </span>
   </div>
 </div>

```

```scss

//app.component.scss
.card {
  background: #444;
  width: 33%;
  margin: 20px;
  padding: 20px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);

  .content {
    font-size: 16px;
    img {
      height: 45px;
      width: 45px;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      border: 2px solid #fff;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 3px;
    }
  }
}


```

This will give you a nice ui friendly list with some basic pagination to increase the user experience. This will lay the groundwork for listing and sorting other stats as well. Enjoy :)

Part 1: [Getting Started with Angular 9 and MSF](https://www.ianposton.com/angular-9-and-mysportsfeed-api-part-1/)

### Deploy an Angular 9 app to Heroku and Encrypt and Decrypt apiKey.
* For Heroku this app uses a node.js / express server file <code>app.js</code>.
* All routes will be going to <code>dist/index.html</code>. 
* Run <code>ng build</code> to build the app in the dist directory.
* Run <code>node app.js</code> to serve the app at `http://localhost:3001`.
* The <code>Procfile</code> in this app's root specifies the server for heroku to use.

```
//Procfile

web: node app.js

```

* This <code>"main": "app.js"</code> line in package.json specifies how to tell heroku to look for <code>app.js</code>.
* Before pushing to github, before heroku deploy set Config Variables.  

Adding the environment variable for the MySportsFeeds api. I didn't want to share my `apiKey` headers information in my github repository so I added my password to my Config Variables for heroku to use in the app settings from the Heroku dashboard. I stored the `apiKey` in my heroku app by going to the app settings in my heroku dashboard. Click on Config Variables and add the key (name) and value (apiKey) there. It will be secured privately away from view. You can call it to the client side by adding this code to the app.js file. I called my env `TOKEN` and made the value MySportsFeeds `apiKey`.


* Use the [Heroku Client API](https://github.com/heroku/node-heroku-client) to retrieve the `TOKEN` from the app and then send it to the front-end of the angular app like this.

* I used my heroku account token to authenticate Heroku Client. I saved it to the config vars of this app as `API_TOKEN`.
* To set up a node.js express server run `npm i express http path`
* To encrypt the apiKey (TOKEN) before sending to client run `npm i crypto-js`

```ts

//app.js 

const express = require('express');
const http = require('http');
const path = require('path');
const Heroku = require('heroku-client')
const CryptoJS = require("crypto-js");
const app = express();

let TOKEN = '';
let ciphertext = null;

app.use(express.static(path.join(__dirname, 'dist')));

//SEND API KEY TO FRONT-END APP.COMPONENT.TS
app.get('/heroku-env', function(req, res){
  ciphertext = CryptoJS.AES.encrypt(response.TOKEN, 'myPassword').toString();
  TOKEN = ciphertext;
  res.json(TOKEN);
});

//SPECIFY NG-BUILD PATH
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
});

//HEROKU PORT
const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));

```
* Get the environment variable sent from heroku to the client side app.component using Http. 
* Decrypt the apiKey (TOKEN) when fetched from server by importing Crypto-js.

```ts

//app.component.ts 

import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
   
   constructor(private http: Http) {}

   getEnv() {
      console.log("trying to get heroku env...");
      this.http.get('/heroku-env')
      .subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));
      });
   }

   ngOnInit() {
    this.getEnv();
   }
}

```

After you <code>git push</code> to your repo follow the steps below. Assuming you have a heroku account and installed the heroku toolbelt. 
<ol>
  <li>run <code>heroku log in</code></li>
  <li>run <code>heroku create name-of-app</code></li>
  <li>run <code>git push heroku master</code></li>
  <li>If deploy is successful run <code>heroku open</code></li>
</ol>
  If there were problems during deploy and you are trying this from scratch here are some requirements heroku needs to deploy.
<ol>
  <li>Have <code>@angular/cli</code> and <code>@angular/compiler-cli</code> listend under dependencies in <code>package.json</code>.</li>
  <li>Add `"postinstall": "ng build"` to the package.json's `"scripts"` object.</li>
</ol>

```js
//package.json

"main": "app.js",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "postinstall": "ng build"
  },
  "engines": {
    "node": "~10.16.2",
    "npm": "~6.13.7"
  }

  ...

```


References for deploying Angular4 to heroku: [https://medium.com/@ervib/deploy-angular-4-app-with-express-to-heroku-6113146915ca](https://medium.com/@ervib/deploy-angular-4-app-with-express-to-heroku-6113146915ca)

### Setting up FireBase.
* Install these modules for firebase config. Run `npm install @angular/fire firebase --save`.
* Import Firebase settings to `app.module.ts`. 
* Create a [firebase db](https://firebase.google.com/) and config the db in `app.module.ts`.  
* Initialize app in the imports array in `ngModule`.

```ts

//app.module.ts

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

export const firebaseConfig = {
  apiKey: *******,
  authDomain: *******,
  databaseURL: *******,
  storageBucket: *******
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ]
  
  ...

})

``` 

### Save Data to FireBase.
* Create a `firebase.service.ts` with an addData function to call the firebase db. 
* Import the `firebase.service` into the `app.component` and call the addData function passing in the data to be save. 

```ts

//firebase.service.ts

import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

  items:FirebaseListObservable<any[]>;

  constructor(public af: AngularFireDatabase) {
    this.items = af.list('/data') 
  }

  addData(stat) {
    this.items.push(stat);
  }

  getData() {
    return  this.items = this.af.list('/data');
  }
}

```

### Get Data from FireBase. 
* Make a function called getData in the `firebase.service` file.
* Call the getData function from `app.component` and save into an array to access it in the html.

```ts

//app.compoent.ts

import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from './firebase.service';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

let headers = new Headers({ "Authorization": "Basic " + btoa('username' + ":" + 'password') });
let options = new RequestOptions({ headers: headers });
let url = 'https://api.mysportsfeeds.com/v1.1/pull/mlb/2017-regular/active_players.json?position=P';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

   playerData: Array<any>;
   showData: Array<any>;

   constructor(private firebaseService: FirebaseService, private http: Http) {}
  
    loadData() {
      this.http.get(url, options)
     .map(response => response.json())
      .subscribe(res => {
        console.log(res['activeplayers'].playerentry, 'got active player data from api!');
        this.playerData = res['activeplayers'].playerentry;
      });

      for (let info of this.playerData) { 
         this.firebaseService
           .addData(info.player);
      }
      
      this.loadOtherData();

   }

   loadOtherData() {
    this.firebaseService
      .getData()
        .subscribe(firebaseData => {
        console.log(firebaseData, 'got response from firebase...');
        this.showData = firebaseData;
      });
   }
    
   ngOnInit() {
    this.loadData();
   }

}

```

```html

//app.compoent.html

<ul>
  <li *ngFor="let data of showData"> 
    {{ data.player.FirstName + ' ' + data.player.LastName + ' - ' + data.team.Abbreviation }}
  </li>
</ul>

```

* Above is a very basic way to save and get data from firebase. Normally this wouldn't be a way to use firebase if you already have data coming in from the api. In this app I use firebase to store a week's worth of game data in firebase to avoid having to call the api 70 times to get the data when the app loads. This is a reason to use firebase, to store large amounts of data. See below for example of making several api calls dynamically. 

### Make multiple api calls dynamically.
In this app I needed to get a week worth of game data. To do this I need to get the schedule for the week and strip all the game ID's then dynamically assign the id to call for each game and get detailed stats from that game.

* In `app.component.ts` `import 'rxjs/add/observable/forkJoin';`. 
* Make an api call to MySportsFeeds api to get all games played last week.
* ForEach loop through the response and use forkJoin to call for sever game results by using the game ID dynamically in the url (endpoint).

```ts

//app.compoent.ts

import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

let headers = new Headers({ "Authorization": "Basic " + btoa('username' + ":" + 'password') });
let options = new RequestOptions({ headers: headers });
let url = 'https://api.mysportsfeeds.com/v1.1/pull/mlb/2017-playoff/full_game_schedule.json?date=from-8-days-ago-to-2-days-ago';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

   activePlayerData: Array<any>;
   cumulativePlayerStatData: Array<any>;
   showData: Array<any>;

   constructor(private http: Http) {}
  
    loadData() {
      this.http.get(url, options)
        .map(response => response.json())
          .subscribe(res => {
            console.log( res['fullgameschedule'].gameentry, 'games from last week!');
            
            //FORKJOIN HELPS MAKE SEVERAL API CALLS
            //STRIP THE GAME ID AND USE IT dynamically IN THE API CALL + g.id +
            Observable.forkJoin(
              res['fullgameschedule'].gameentry.map(
                 g =>
                 this.http.get('https://api.mysportsfeeds.com/v1.1/pull/mlb/2017-regular/game_playbyplay.json?gameid=' + g.id + '&status=final', options)
                 .map(response => response.json())
               )
             ).subscribe(res => {
                 //THIS WILL LOG GAME RESULTS SUCH AS HITS/PITCHES/STOLENBASES/RUNS...
                 let i;
                 res.forEach((item, index) => {
                   i = index;
                   console.log(res[i]['gameplaybyplay'], 'got game data!');
                 })
              })
          })
   }

    
   ngOnInit() {
    this.loadData();
   }

}

```

* This is an example of getting lots of data to store to your db in firebase. Avoid making a lot of api calls like shown above each time the app loads. 
* Tread carefully when making this many get requests to an api. Most api's have request limits. MySportsFeeds has a 250 request limit which resets every 5 minutes. Meaning if there are more than 250 requests in less than 5 minutes, following requests will be rejected until the 5 minute hold resets.  

### Make custom data.
In this app I use one array to show all data in the views. I use 5 different endpoints to get different information about each player. In order to sort the data and apply it to the correct player I use the responses returned by the endpoints, for each loop through the response and match data by player ID so that the custom data can be added to the player object and stored in one array for the view. 

* Call two api endpoints when the app is loaded. 
* Use a condition to wait for the response to come back before sorting data by player ID. 
* Use a nested forEach loop to get the response items. 
* If player ID is a match create a new key on the player object and assign a value.
* After the forEach loop is done assign the array to a new Array for the view to display the custom data. 

```ts

//app.compoent.ts

import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

let headers = new Headers({ "Authorization": "Basic " + btoa('username' + ":" + 'password') });
let options = new RequestOptions({ headers: headers });
let url1 = 'https://api.mysportsfeeds.com/v1.1/pull/mlb/2017-regular/active_players.json?position=P';
let url2 = 'https://api.mysportsfeeds.com/v1.1/pull/mlb/2017-regular/cumulative_player_stats.json?position=P&sort=STATS.Pitching-NP.D&limit=275';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

   activePlayerData: Array<any>;
   cumulativePlayerStatData: Array<any>;
   showData: Array<any>;

   constructor(private http: Http) {}
  
    loadData() {
      this.http.get(url, options)
        .map(response => response.json())
          .subscribe(res => {
          console.log(res['activeplayers'].playerentry, 'got active player data from api!');
          this.activePlayerData = res['activeplayers'].playerentry;
      });
      
      this.loadOtherData();

   }

   loadOtherdata() {
    this.http.get(url, options)
     .map(response => response.json())
      .subscribe(res => {
        console.log(res['cumulativeplayerstats'].playerstatsentry, 'got player info res!');
        this.cumulativePlayerStatData = res['cumulativeplayerstats'].playerstatsentry;
      });
      
      //USE A CONDITION TO CHECK BOTH ARRAYS
      if (this.cumulativePlayerStatData && this.activePlayerData) {
        //NESTED FOREACH LOOP
        for (let info of this.activePlayerData) { 
          for (let data of this.cumulativePlayerStatData) {
            //CHECK IF PLAYER ID IS MATCH THEN APPLY CUSTOM DATA TO BE ADDED
            //TO cumulativePlayerStatData PLAYER ITEMS
            if (data.player.ID === info.player.ID) {
              data.player.image = info.player.officialImageSrc;
              data.player.age = info.player.Age;
              data.player.city = info.player.BirthCity;
              data.player.country = info.player.BirthCountry;
              data.player.Height = info.player.Height;
              data.player.Weight = info.player.Weight;
              data.player.IsRookie = info.player.IsRookie;

              //SHOWDATA IS CALLED IN THE HTML WITH NEW CUSTOM DATA ADDED
              this.showData = this.cumulativePlayerStatData;
            } 
          }
        }
      } 
   }
    
   ngOnInit() {
     this.loadData();
   }

}

```

```html

//app.compoent.html

<div *ngFor="let data of showData">
 <p>{{ data.player.FirstName + ' ' + data.player.LastName + ' (' + data.team.Name + ' - ' + data.player.Position + ')'}} <span *ngIf="data.player.IsRookie == 'true'" style="background:#2ecc71; color:#fff; padding:1px; border-radius:2px;">Rookie</span>
      <br> Age: {{data.player.age}} Height: {{data.player.Height}} Weight: {{data.player.Weight}}
      <br> Birth City: {{data.player.city +', '+ data.player.country}}
      <br> Number: {{data.player.JerseyNumber}}</p>
</div>

```

### Angular-material2 mdDialog module.
In a single page app modals are a cool way to show some specific data in the same view. In this app there are 275 rows of individual baseball players and their stats. I have made each row enabled to be clicked to pop up a modal with more specific real time stats. 

This app uses [angular material2 pop up modal](https://material.angular.io/components/dialog/overview) to show baseball player data. 

* Run `npm install --save @angular/material @angular/cdk`
* Import it to `app.module` `import {MdDialogModule} from '@angular/material`;
* Set it up in `app.component` and make an open function for the modal.
* Create a click event in `app.component.html` to pass in the player data and open the modal from the dataTable. `<md-row (click)="open($event, data)" *cdkRowDef="let data; columns: displayedColumns; let i=index;"></md-row>` 
* Import the MyDialog component to `app.module`. `import { AppComponent, MyDiaog } from './app.component';` and add MyDialog to the `ngModule`.

```ts

//app.module.ts

import { AppComponent, MyDiaog } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    MyDialog
  ],
  imports: [
    MdTableModule,
    MdDialogModule
  ]
  providers: [FirebaseService],
  entryComponents: [
    MyDialog
  ],
  bootstrap: [AppComponent]
})



```

```ts

//app.compoent.ts

import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

let headers = new Headers({ "Authorization": "Basic " + btoa('username' + ":" + 'password') });
let options = new RequestOptions({ headers: headers });
let url = 'https://api.mysportsfeeds.com/v1.1/pull/mlb/2017-regular/cumulative_player_stats.json?position=P&sort=STATS.Pitching-NP.D&limit=275';

export interface Data {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

   cumulativePlayerStatData: Array<any>;
   showData: Array<any>;
   displayedColumns = [
    'id',
    'pitches',
    'strikeouts',
    'pitcherWalks',
    'inningsPitched',
    'pitchesPerInning',
    'pitcherWildPitches',
    'pickoffAttempts'
  ];
  dataSource: MyDataSource;

   constructor(private http: Http, public dialog: MdDialog) {}
  
    loadData() {
      this.http.get(url, options)
     .map(response => response.json())
      .subscribe(res => {
        console.log(res['cumulativeplayerstats'].playerstatsentry, 'got player info res!');
        this.cumulativePlayerStatData = res['cumulativeplayerstats'].playerstatsentry;
      });

      this.showData = this.cumulativePlayerStatData;

      //This fills the dataTable with data
      this.dataSource = new MyDataSource(this.showData);

   }
   
   ngOnInit() {
    this.loadData();
   }
  
  //THIS FUNCTION IS CALLED FROM APP.COMPONENT
  //WHEN A TABLE ROW IS CLICKED PASSING IN THAT PLAYERS DATA 
  //TO THE MODAL. THEN MODAL IS CALLED TO OPEN. 
  //HTML FOR MODAL BELOW
  public open(event, data) {
    this.selected = data;
    console.log(data, 'ok you clicked on a table row....');
    this.dialog.open(MyDialog, {
      data: data,
      width: '600px',
    });
  }

}

@Component({
  selector: 'my-dialog',
  template: `<md-dialog-content>
  <md-icon (click)="dialogRef.close()" style="float:right; cursor:pointer;">close</md-icon>
</md-dialog-content>
<md-grid-list cols="3" rowHeight="200px" class="dialog-head">
  <md-grid-tile [colspan]="1">
    <img src="{{ data.player.image }}">
  </md-grid-tile>
  <md-grid-tile [colspan]="2">
    <p>{{ data.player.FirstName + ' ' + data.player.LastName + ' (' + data.team.Name + ' - ' + data.player.Position + ')'}} <span *ngIf="data.player.IsRookie == 'true'" style="background:#2ecc71; color:#fff; padding:1px; border-radius:2px;">Rookie</span>
      <br> Age: {{data.player.age}} Height: {{data.player.Height}} Weight: {{data.player.Weight}}
      <br> Birth City: {{data.player.city +', '+ data.player.country}}
      <br> Number: {{data.player.JerseyNumber}}</p>
  </md-grid-tile>
</md-grid-list>
<md-grid-list cols="3" rowHeight="50px">
  <md-grid-tile [colspan]="1">
    <h1><b>W-L:</b> {{ data.stats.Wins['#text'] +'-'+ data.stats.Losses['#text'] }}</h1>
  </md-grid-tile>
  <md-grid-tile [colspan]="1">
    <h1><b>ERA:</b> {{ data.stats.EarnedRunAvg['#text'] }}</h1>
  </md-grid-tile>
  <md-grid-tile [colspan]="1">
    <h1><b>K's:</b> {{ data.stats.PitcherStrikeouts['#text'] }}</h1>
  </md-grid-tile>
</md-grid-list>`,
})

export class MyDialog {
  constructor(public dialogRef: MdDialogRef < MyDialog > , @Inject(MD_DIALOG_DATA) public data: any) {}
}

export class MyDataSource extends DataSource <Data> {

  constructor(private datas: Data[]) {
    super();
  }

  connect(): Observable <Data[]> {
    return Observable.of(this.data); 
  }

  disconnect() {}

}

```

```html

//app.compoent.html


```

* My example shows the older naming conventions for MdDialog which is now called MatDialog. The main difference is the import would look like this `import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';`




