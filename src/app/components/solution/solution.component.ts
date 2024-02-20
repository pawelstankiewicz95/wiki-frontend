import { Component, OnInit } from '@angular/core';
import { Solution } from '../../models/solution';
import { SolutionService } from '../../services/solution.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [RouterModule, QuillModule, DatePipe, NgClass, CommonModule],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit {
  public solutions: Solution[] = [];
  subjectId: number = 1;
  isSaveButtonHidden: boolean = false;



  constructor(private solutionService: SolutionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('subjectId')) {
        this.subjectId = +params.get('subjectId')!;
        this.getSolutionsBySubjectId();

        this.solutionService.solutions$.subscribe(solutions => {
          this.solutions = solutions;
        });

        this.solutionService.isSaveButtonHidden$.subscribe(button => {this.isSaveButtonHidden = button})
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
        this.solutionService.saveButtonHidden(true);
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
  
}
