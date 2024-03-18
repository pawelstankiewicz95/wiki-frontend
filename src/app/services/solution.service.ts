import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Solution } from '../models/solution';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private apiServerUrl = 'http://localhost:8080/api/solutions';

  private _solutions = new BehaviorSubject<Solution[]>([]);
  solutions$ = this._solutions.asObservable();

  private isAddButtonHidden = new BehaviorSubject<boolean>(false);
  isAddButtonHidden$ = this.isAddButtonHidden.asObservable();


  constructor(private httpClient: HttpClient) { }

  private updateSolutions(updatedSolutions: Solution[]): void {
    this._solutions.next(updatedSolutions);
  }

  public getSolutionById(solutionId: number): Observable<Solution> {
    return this.httpClient.get<Solution>(`${this.apiServerUrl}/${solutionId}`);
  }

  public getSolutionsBySubjectId(subjectId: number): Observable<Solution[]> {
    return this.httpClient.get<Solution[]>(`${this.apiServerUrl}/solutions-by-subject-id/${subjectId}`)
      .pipe(map(solutions => {
        this.updateSolutions(solutions);
        return solutions;
      }));
  }

  public saveSolution(subjectId: number, solution: Solution): Observable<Solution> {
    const url = `${this.apiServerUrl}?subjectId=${subjectId}`;
    return this.httpClient.post<Solution>(url, solution)
      .pipe(
        tap((savedSolution: Solution) => {
          const currentSolutions = this._solutions.getValue();
          this._solutions.next([...currentSolutions, savedSolution]);
        })
      );
  }

  public saveSolutionWithSubject(categoryId: number, solution: Solution): Observable<Solution> {
    const url = `${this.apiServerUrl}/with-subject?categoryId=${categoryId}`;
    return this.httpClient.post<Solution>(url, solution)
      .pipe(
        tap((savedSolution: Solution) => {
          const currentSolutions = this._solutions.getValue();
          this._solutions.next([...currentSolutions, savedSolution]);
        })
      );
  }

  public updateSolution(solution: Solution): Observable<Solution> {
    const url = `${this.apiServerUrl}`;
    return this.httpClient.put<Solution>(url, solution)
      .pipe(map(updatedSolution => {
        const currentSolutions = this._solutions.getValue();
        const updatedSolutions = currentSolutions.map(s => (s.id === updatedSolution.id ? updatedSolution : s));
        this.updateSolutions(updatedSolutions);
        return updatedSolution;
      }));
  }

  public deleteSolution(solutionId: number): Observable<void> {
    const url = `${this.apiServerUrl}?solutionId=${solutionId}`;
    return this.httpClient.delete<void>(url)
      .pipe(map(() => {
        const currentSolutions = this._solutions.getValue();
        const updatedSolutions = currentSolutions.filter(solution => solution.id !== solutionId);
        this.updateSolutions(updatedSolutions);
      }));
  }


  public addButtonHidden(hidden: boolean) {
    this.isAddButtonHidden.next(hidden);
  }
}

