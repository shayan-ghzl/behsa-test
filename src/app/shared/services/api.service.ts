import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, of, timeout } from 'rxjs';
import { IEntity } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    return this.http.get<IEntity>('./assets/fake-api/users.json', { responseType: 'json' }).pipe(
      delay(1000),
      timeout(16000),
      catchError(() => of({limit: 0, skip: 0, total: 0, users: []}))
    );
  }

}
