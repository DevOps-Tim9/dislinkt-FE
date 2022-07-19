import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../models/request/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  getById(id: number): Observable<Image> {
    return this.http.get<Image>(`${environment.api_url}medias-ms/api/medias/${id}`);
  }

}
