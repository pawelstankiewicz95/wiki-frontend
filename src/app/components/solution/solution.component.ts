import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { Solution } from '../../models/solution';
import { SolutionSubject } from '../../models/soultionSubject';
import { SolutionSubjectService } from '../../services/solution-subject.service';
import { SolutionService } from '../../services/solution.service';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [RouterModule, QuillModule, DatePipe, NgClass, CommonModule],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit {
  public solutions: Solution[] = [];
  public subject: SolutionSubject | undefined;
  subjectId: number = 1;
  isAddButtonHidden: boolean = false;



  constructor(
    private subjectService: SolutionSubjectService,
    private solutionService: SolutionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('subjectId')) {
        this.subjectId = +params.get('subjectId')!;
        this.getSolutionsBySubjectId();
        this.getSubject(this.subjectId);

        this.solutionService.solutions$.subscribe(solutions => {
          this.solutions = solutions;
        });

        this.solutionService.isAddButtonHidden$.subscribe(button => {this.isAddButtonHidden = button})
      }
    });
  }

  public getSolutionsBySubjectId(): void {
    this.solutionService.getSolutionsBySubjectId(this.subjectId).subscribe((response: Solution[]) => {
      this.solutions = response;
    });
  }

  public add(): void {
    this.router.navigate([`./new-solution/`], { relativeTo: this.route, queryParams: { subjectId: this.subjectId } })
      .then(() => {
        this.solutionService.addButtonHidden(true);
        setTimeout(() => {
          this.goToBottom();
        }, 0);
      });
  }
  public delete(solutionId: number) {
    this.solutionService.deleteSolution(solutionId)
      .subscribe({
        next: (response) => console.log('Item deleted:', response),
        error: (err) => console.log(err)
      });
  }

  goToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  public getSubject(id: number): void{
    this.subjectService.getSubjectById(id).subscribe((response: SolutionSubject) => this.subject = response);
  }
  
}
