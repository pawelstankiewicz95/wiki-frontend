import { Component, OnInit } from '@angular/core';
import { Solution } from '../../models/solution';
import { SolutionService } from '../../services/solution.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [RouterModule, QuillModule, DatePipe],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit {
  public solutions: Solution[] = [];
  subjectId: number = 1;

  constructor(private solutionService: SolutionService, private route: ActivatedRoute) {}

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
}
