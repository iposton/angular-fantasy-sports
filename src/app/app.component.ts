import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (private meta: Meta,
    private title: Title) {
      this.title.setTitle('NHL and NBA Live Stats & Starters');
      //dynamic//this.meta.updateTag({ 
      //   name: 'NHL Starting Goalies and NBA Starting Lineup', 
      //   content: 'Fantasy Hockey Daily Stats. Fantasy Basketball Daily Stats.'
      // });
      this.meta.addTag({ name: 'description', content: 'NHL Starting Goalies and NBA Starting Lineup' });
      this.meta.addTag({ name: 'keywords', content: 'Fantasy Sports, NHL, NBA' });
      this.meta.addTag({ property: 'og:type', content: 'article' });
      this.meta.addTag({ property: 'og:site_name', content: 'Fantasy Sports Resources' });
      this.meta.addTag({ property: 'og:title', content: 'NHL and NBA Live Stats & Starters' });
      this.meta.addTag({ property: 'og:description', content: 'Fantasy Hockey Daily Stats. Fantasy Basketball Daily Stats.' });
      this.meta.addTag({ property: 'og:url', content: 'www.fantasy-sports-resources.com' });
      this.meta.addTag({ property: 'og:image', content: 'www.fantasy-sports-resources.com/assets/fsr.png' });
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
