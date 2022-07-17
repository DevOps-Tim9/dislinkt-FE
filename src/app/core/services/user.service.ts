import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

}
