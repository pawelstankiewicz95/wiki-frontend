import { Component } from '@angular/core';
import { Program } from '../../../models/program';
import { ProgramService } from '../../../services/program.service';

@Component({
  selector: 'app-program-list',
  standalone: true,
  imports: [],
  templateUrl: './program-list.component.html',
  styleUrl: './program-list.component.css'
})
export class ProgramListComponent {

  public programs: Program[] = [];

  constructor(private programService: ProgramService) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  public getPrograms(): void {
    this.programService.getPrograms().subscribe((response: Program[]) => this.programs = response);
  }
}
