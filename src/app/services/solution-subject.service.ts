import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolutionSubject } from '../models/soultionSubject';

@Injectable({
  providedIn: 'root'
})
export class SolutionSubjectService {

  private apiServerUrl = 'http://localhost:8080/api/subjects';

  constructor(private httpClient: HttpClient) { }

  public getSubjectsByCategoryId(categoryId: number): Observable<SolutionSubject[]> {
    return this.httpClient.get<SolutionSubject[]>(`${this.apiServerUrl}/subjects-by-category-id/${categoryId}`);
  }
}
