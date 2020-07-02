import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Injectable();
export class AuthInterceptorService  implements HttpInterceptor {

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
     console.log('Interceptor in progress');
     const token: string = localStorage.getItem('token');
     req = req.clone({ headers: req.headers.set('Authorization', token) });

     if ( req.url.includes('/api/file/download/')) {
      req = req.clone({ responseType: 'blob'});
     } else if (req.url.includes('/api/file')) {
      req = req.clone({ headers: req.headers.set('Accept', 'application/json')});
     } else {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json')});
        req = req.clone({ headers: req.headers.set('Accept', 'application/json')});
      }
     return next.handle(req)
                .pipe(
                  catchError((error: HttpErrorResponse) => {
                    // 401 UNAUTHORIZED
                     if (error && error.status === 401 ) {
                        console.log('Error 401 UNANTHORIZED');
                     }

                     const err = error.message || error.statusText;
                     return throwError(error);
                  })
                );
   }
}

