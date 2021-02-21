import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import{ Router, NavigationEnd } from '@angular/router';
//declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public menu: boolean = false;
  public mobile: boolean = false;
  public isOpen: boolean = false;

  constructor (private meta: Meta,
    private title: Title,
    public router: Router) {
      this.title.setTitle('Stats | NHL NBA MLB NFL');
  
      this.meta.addTags([
      { name: 'description', content: 'NHL Starting Goalies, NBA Starting Lineup, Stat Leaders.' },
      { name: 'keywords', content: 'Hockey, Fantasy, Basketball, Football, Baseball, Stats' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Fantasy Sports Resources' },
      { property: 'og:title', content: 'NHL, NFL, MLB, NBA Live Stats & Starters' },
      { property: 'og:description', content: 'Fantasy Hockey Daily Stats. Fantasy Basketball Daily Stats.' },
      { property: 'og:url', content: 'https://fantasy-sports-resources.com' },
      { property: 'og:image', content: 'https://fantasy-sports-resources.com/assets/fsr.png' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Ian Poston' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@StreamingLists' },
      { name: 'twitter:title', content: 'Stats | NHL, NBA, MLB, NFL' },
      { name: 'twitter:description', content: 'Fantasy Hockey Daily Stats. Fantasy Basketball Daily Stats.' },
      { name: 'twitter:image', content: 'https://fantasy-sports-resources.com/assets/images/home-page.png' },
      ])

      // this.router.events.subscribe(event => {
      //   if(event instanceof NavigationEnd) {
      //       gtag('config', 'UA-61983807-3', {'page_path': event.urlAfterRedirects});
      //    }
      // })
  }

  ngOnInit() {
    if (window.innerWidth < 1000) { // 768px portrait
      this.mobile = true;
    }
  }
 
}
