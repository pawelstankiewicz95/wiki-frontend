import { Component, OnInit } from '@angular/core';
import { Solution } from '../../models/solution';
import { SolutionService } from '../../services/solution.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit {
  public solutions: Solution[] = [];
  solutionId: number = 1;

  constructor(private solutionService: SolutionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('solutionId')) {
        this.solutionId = +params.get('solutionId')!;
        this.getSolutionsBySubjectId();
      }
    });
  }

  public getSolutionsBySubjectId(): void {
    this.solutionService.getSolutionsBySubjectId(this.solutionId).subscribe((response: Solution[]) => {
      this.solutions = response;
    });
  }
}
