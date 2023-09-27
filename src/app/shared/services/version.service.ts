import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  constructor(private http: HttpClient) {}

  getBuildVersion() {
    if (!environment.production) {
      return of('dev-build');
    }

    return this.http
      .get('assets/version.txt', { responseType: 'text' })
      .pipe(catchError(() => of('unknow')));
  }
}
