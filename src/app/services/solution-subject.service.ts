import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SolutionSubject } from '../models/soultionSubject';

@Injectable({
  providedIn: 'root'
})
export class SolutionSubjectService {

  private apiServerUrl = 'http://localhost:8080/api/subjects';

  private isAddButtonHidden = new BehaviorSubject<boolean>(false);
  isAddButtonHidden$ = this.isAddButtonHidden.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getSubjectsByCategoryId(categoryId: number): Observable<SolutionSubject[]> {
    return this.httpClient.get<SolutionSubject[]>(`${this.apiServerUrl}/subjects-by-category-id/${categoryId}`);
  }

  public getSubjectsByTitleLike(title: string){
    return this.httpClient.get<SolutionSubject[]>(`${this.apiServerUrl}/search-by-title`, { params: { title: title } });
  }

  
  public addButtonHidden(hidden: boolean) {
    this.isAddButtonHidden.next(hidden);
  }

}
