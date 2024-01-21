import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiServerUrl = 'http://localhost:8080/api/categories';

  constructor(private httpClient: HttpClient) { }

  public getCategoriesByProgramId(programId: number): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiServerUrl}/categories-by-program-id/${programId}`);
  }
}
