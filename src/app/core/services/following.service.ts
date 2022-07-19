import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  constructor(
    private http: HttpClient
  ) { }

  pushUnfollow(id: number, followingID: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}users-ms/user/${id}/removeFollower/${followingID}`);
  }

  pushFollow(id: number, followingID: number): Observable<any> {
    return this.http.post<any>(`${environment.api_url}users-ms/follower`, {FollowerId:id, FollowingId:followingID});
  }

  pushRequest(id: number, followingID: number): Observable<any> {
    return this.http.post<any>(`${environment.api_url}users-ms/requests`, {FollowerId:id, FollowingId:followingID});
  }


  changeRequest(requestId, followerId, followingId, status): Observable<any> {
    return this.http.put<any>(`${environment.api_url}users-ms/requests/${requestId}`, {ID:requestId, FollowerId:followerId,
      FollowingId:followingId, RequestStatus:status});
  }
}
