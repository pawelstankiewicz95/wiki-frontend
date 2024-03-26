import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { SolutionSubject } from '../models/soultionSubject';

@Injectable({
  providedIn: 'root'
})
export class SolutionSubjectService {

  private apiServerUrl = 'http://localhost:8080/api/subjects';

  private _subjects = new BehaviorSubject<SolutionSubject[]>([]);
  subjects$ = this._subjects.asObservable();

  private isAddButtonHidden = new BehaviorSubject<boolean>(false);
  isAddButtonHidden$ = this.isAddButtonHidden.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getSubjectsByCategoryId(categoryId: number): Observable<SolutionSubject[]> {
    return this.httpClient.get<SolutionSubject[]>(`${this.apiServerUrl}/subjects-by-category-id/${categoryId}`)
    .pipe(map(subjects => {
      this.updateSubjects(subjects);
      return subjects;
    }));
  }

  public getSubjectsByTitleLike(title: string){
    return this.httpClient.get<SolutionSubject[]>(`${this.apiServerUrl}/search-by-title`, { params: { title: title } });
  }

  public getSubjectById(subjectId: number){
    return this.httpClient.get<SolutionSubject>(`${this.apiServerUrl}/${subjectId}`)
  }

  public saveSubject(categoryId: number, subject: SolutionSubject): Observable<SolutionSubject> {
    const url = `${this.apiServerUrl}?categoryId=${categoryId}`;
    return this.httpClient.post<SolutionSubject>(url, subject)
      .pipe(
        tap((savedSubject: SolutionSubject) => {
          const currentSubjects = this._subjects.getValue();
          this._subjects.next([...currentSubjects, savedSubject]);
        })
      );
  }

  public addButtonHidden(hidden: boolean) {
    this.isAddButtonHidden.next(hidden);
  }

  private updateSubjects(updatedSubjects: SolutionSubject[]): void {
    this._subjects.next(updatedSubjects);
  }

}
