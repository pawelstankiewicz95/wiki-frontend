import { Component } from '@angular/core';
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
export class SolutionComponent {

  
  public solutions: Solution[] = [];
  hasSolutionId: boolean = false;
  solutionId: number = 1;

  constructor(private solutionService: SolutionService,  private route: ActivatedRoute){};

  ngOnInit(): void {
    this.getSolutionsBySubjectId();
  }

  public getSolutionsBySubjectId(): void {
    this.solutionId = +this.route.snapshot.paramMap.get('subjectId')!;
    this.solutionService.getSolutionsBySubjectId(this.solutionId).subscribe((response: Solution[]) => this.solutions = response);
  }
}
