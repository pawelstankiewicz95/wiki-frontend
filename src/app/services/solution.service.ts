import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solution } from '../models/solution';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private apiServerUrl = 'http://localhost:8080/api/solutions';

  constructor(private httpClient: HttpClient) { }

  public getSolutionsBySubjectId(subjectId: number): Observable<Solution[]> {
    return this.httpClient.get<Solution[]>(`${this.apiServerUrl}/solutions-by-subject-id/${subjectId}`);
  }
}
