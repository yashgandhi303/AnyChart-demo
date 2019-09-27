import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here

@Injectable()
export class DemoDataProviderService {
  /*
   Parent-children communicate via a service is used.
   https://angular.io/guide/component-interaction#parent-and-children-communicate-via-a-service
  */
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://cdn.anychart.com/samples/gantt-charts/server-status-list/_data.json')
  }
}
