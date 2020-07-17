import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StateKey, TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class TransferStateInterceptor implements HttpInterceptor {

  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: any,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // For this demo application, we will only worry about State Transfer for get requests.
    if (request.method !== 'GET') {
      return next.handle(request);
    }


    // Use the request url as the key.
    const stateKey: StateKey<string> = makeStateKey<string>(request.url);

    // For any http requests made on the server, store the response in State Transfer.
    if (isPlatformServer(this.platformId)) {
      return next.handle(request).pipe(
        tap((event: HttpResponse<any>) => {
          this.transferState.set(stateKey, event.body);
        })
      );
    }

    // For any http requests made in the browser, first check State Transfer for a 
    // response corresponding to the request url.
    if (isPlatformBrowser(this.platformId)) {
      const transferStateResponse = this.transferState.get<any>(stateKey, null);
      if (transferStateResponse) {
        const response = new HttpResponse({ body: transferStateResponse, status: 200 });

        // Remove the response from state transfer, so any future requests to 
        // the same url go to the network (this avoids us creating an 
        // implicit/unintentional caching mechanism).
        this.transferState.remove(stateKey);
        return of(response);
      } else {
        return next.handle(request);
      }
    }
  }
}