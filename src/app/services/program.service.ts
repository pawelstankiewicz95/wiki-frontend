import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Program } from '../models/program';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiServerUrl = 'http://localhost:8080/api/programs';

  constructor(private httpClient: HttpClient) { }

  public getPrograms(): Observable<Program[]> {
    return this.httpClient.get<Program[]>(this.apiServerUrl);
  }
}
