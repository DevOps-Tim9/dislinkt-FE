import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserUpdateRequest } from '../models/request/user-update-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}users-ms/users/${id}`);
  }

  getByUsername(username: string): Observable<any[]> {
    return this.http.get<any>(`${environment.api_url}users-ms/users/username?username=${username}`);
  }

  getFollowers(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}users-ms/user/${id}/followers`);
  }

  getFollowing(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}users-ms/user/${id}/following`);
  }

  getRequests(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}users-ms/requests/${id}`);
  }

  getByEmail(mail: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}users-ms/users?email=${mail}`);
  }

  getNotificationSettings(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.api_url}users-ms/users/get-notifications`);
  }

  setNotifications(settings): Observable<any> {
    return this.http.post(`${environment.api_url}users-ms/users/set-notifications`, settings, { headers: this.headers, responseType: 'json' });
  }

  update(user: UserUpdateRequest): Observable<any> {
    return this.http.put(`${environment.api_url}users-ms/users`, user, { headers: this.headers, responseType: 'json' });
  }

}
