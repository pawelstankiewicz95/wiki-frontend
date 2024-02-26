import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarginService {
  private marginTopSource = new BehaviorSubject<string>('0px');
  currentMarginTop = this.marginTopSource.asObservable();

  constructor() { }

  changeMarginTop(marginTop: string) {
    this.marginTopSource.next(marginTop);
  }
}