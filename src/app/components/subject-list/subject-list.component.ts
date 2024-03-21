import { Component } from '@angular/core';
import { SolutionSubject } from '../../models/soultionSubject';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SolutionSubjectService } from '../../services/solution-subject.service';
import { DatePipe, NgClass } from '@angular/common';
import { SolutionService } from '../../services/solution.service';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [RouterModule, DatePipe, NgClass],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent {

  public subjects: SolutionSubject[] = [];
  hasSearchParameter: boolean = false;
  hasCategoryId: boolean = false;
  categoryId: number = 1;
  searchValue: string = "";
  isAddButtonHidden: boolean = false;


  constructor(private subjectService: SolutionSubjectService, private solutionService: SolutionService,  private route: ActivatedRoute,     private router: Router){};

  ngOnInit(): void {
    this.handleShowingSubjects();
    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('categoryId')!
      this.searchValue = params.get('searchValue')!
      this.handleShowingSubjects();
      this.subjectService.isAddButtonHidden$.subscribe(button => {this.isAddButtonHidden = button})
    });
  }

  public handleShowingSubjects() {
    this.hasCategoryId = this.route.snapshot.paramMap.has('categoryId');
    this.hasSearchParameter = this.route.snapshot.paramMap.has('searchParam');
    if (this.hasSearchParameter) {
      this.searchSubjectByTitle();
    }
    if (this.hasCategoryId) {
      this.getSubjectsByCategoryId();
    }
  }

  public getSubjectsByCategoryId(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    this.subjectService.getSubjectsByCategoryId(this.categoryId).subscribe((response: SolutionSubject[]) => this.subjects = response);
  }

  public searchSubjectByTitle() {
    this.searchValue = this.route.snapshot.paramMap.get('searchParam')!;
    this.subjectService.getSubjectsByTitleLike(this.searchValue).subscribe((response: SolutionSubject[]) => this.subjects = response);
  }

  
  public add(): void {
    this.router.navigate([`./new-subject/`], { relativeTo: this.route, queryParams: { categoryId: this.categoryId } })
      .then(() => {
        this.subjectService.addButtonHidden(true);
        setTimeout(() => {
          this.goToBottom();
        }, 0);
      });
  }

  goToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
