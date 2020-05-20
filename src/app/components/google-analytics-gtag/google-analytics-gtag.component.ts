import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-google-analytics-gtag',
  templateUrl: './google-analytics-gtag.component.html',
  styleUrls: ['./google-analytics-gtag.component.scss']
})
export class GoogleAnalyticsGtagComponent {
  trackingCode = environment.googleAnalyticsTrackingCode;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef,
  ) {
    // BROWSER
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script') as HTMLScriptElement;
      script.src = `//www.googletagmanager.com/gtag/js?id=${this.trackingCode}`;
      script.async = true;
      this.renderer.appendChild(this.el.nativeElement, script);

      const script2 = this.renderer.createElement('script') as HTMLScriptElement;
      const scriptBody = this.renderer.createText(`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', '${this.trackingCode}');
      `);
      this.renderer.appendChild(script2, scriptBody);
      this.renderer.appendChild(this.el.nativeElement, script2);
    }
  }
}
