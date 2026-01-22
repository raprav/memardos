import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meme } from '../interfaces/memes.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemesService {
  private apiUrl = environment.apiUrl;

  http = inject(HttpClient);

  getMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(`${this.apiUrl}/memes`);
  }
}
