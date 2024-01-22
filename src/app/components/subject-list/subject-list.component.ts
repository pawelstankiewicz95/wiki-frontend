import { Component } from '@angular/core';
import { SolutionSubject } from '../../models/soultionSubject';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SolutionSubjectService } from '../../services/solution-subject.service';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent {

  public subjects: SolutionSubject[] = [];
  hasProgramId: boolean = false;
  programId: number = 1;

  constructor(private subjectService: SolutionSubjectService,  private route: ActivatedRoute){};

  ngOnInit(): void {
    this.getSubjectsByCategoryId();
  }

  public getSubjectsByCategoryId(): void {
    this.programId = +this.route.snapshot.paramMap.get('categoryId')!;
    this.subjectService.getSubjectsByCategoryId(this.programId).subscribe((response: SolutionSubject[]) => this.subjects = response);
  }
}
