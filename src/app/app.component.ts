import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import{ Router, NavigationEnd } from '@angular/router';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (private meta: Meta,
    private title: Title,
    public router: Router) {
      this.title.setTitle('NHL & NBA Stats');
      //dynamic//this.meta.updateTag({ 
      //   name: 'NHL Starting Goalies and NBA Starting Lineup', 
      //   content: 'Fantasy Hockey Daily Stats. Fantasy Basketball Daily Stats.'
      // });
      this.meta.addTag({ name: 'description', content: 'NHL Starting Goalies and NBA Starting Lineup' });
      this.meta.addTag({ name: 'keywords', content: 'Hockey, Fantasy, Basketball, Stats' });
      this.meta.addTag({ property: 'og:type', content: 'website' });
      this.meta.addTag({ property: 'og:site_name', content: 'Fantasy Sports Resources' });
      this.meta.addTag({ property: 'og:title', content: 'NHL and NBA Live Stats & Starters' });
      this.meta.addTag({ property: 'og:description', content: 'Fantasy Hockey Daily Stats. Fantasy Basketball Daily Stats.' });
      this.meta.addTag({ property: 'og:url', content: 'https://fantasy-sports-resources.com' });
      this.meta.addTag({ property: 'og:image', content: 'https://fantasy-sports-resources.com/assets/fsr.png' });

      this.router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
            gtag('config', 'UA-61983807-3', {'page_path': event.urlAfterRedirects});
         }
      })
  }
  //position for tooltip
  position = 'above';

  public isVisibleOnMobile() {
    // console.log('width under 600px');
  }

  public isVisibleOnDesktop() {
    // console.log('width over 600px');
  }
}
