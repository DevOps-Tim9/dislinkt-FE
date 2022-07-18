import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient
  ) { }

  getNotifications(): Observable<any> {
    return this.http.get<any>(`${environment.api_url}notifications-ms/notifications`);
  }

  deleteNotifications(): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}notifications-ms/notifications`);
  }

}
