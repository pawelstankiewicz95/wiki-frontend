import { Component, OnInit } from '@angular/core';
import { Solution } from '../../models/solution';
import { SolutionService } from '../../services/solution.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [RouterModule, QuillModule, DatePipe, NgClass],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit {
  public solutions: Solution[] = [];
  subjectId: number = 1;
  buttonHidden: boolean = false;

  constructor(private solutionService: SolutionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('subjectId')) {
        this.subjectId = +params.get('subjectId')!;
        this.getSolutionsBySubjectId();
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
        this.buttonHidden = true;
        setTimeout(() => {
          this.goToBottom();
        }, 0);
      });
  }

  goToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
