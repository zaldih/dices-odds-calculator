import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  getBuildVersion() {
    if (!environment.production) {
      return 'dev-build';
    }

    return environment.buildDate;
  }
}
