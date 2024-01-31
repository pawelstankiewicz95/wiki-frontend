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

  public getSolutionById(solutionId: number): Observable<Solution> {
    return this.httpClient.get<Solution>(`${this.apiServerUrl}/${solutionId}`);
  }

  public getSolutionsBySubjectId(subjectId: number): Observable<Solution[]> {
    return this.httpClient.get<Solution[]>(`${this.apiServerUrl}/solutions-by-subject-id/${subjectId}`);
  }

  public saveSolution(subjectId: number, solution: Solution): Observable<Solution> {
    const url = `${this.apiServerUrl}?subjectId=${subjectId}`;
    return this.httpClient.post<Solution>(url, solution);
  }

  public updateSolution(solution: Solution): Observable<Solution> {
    const url = `${this.apiServerUrl}`;
    return this.httpClient.put<Solution>(url, solution);
  }
}
