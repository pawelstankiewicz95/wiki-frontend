import { Component } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css'
})
export class TopNavBarComponent {

  public programs: Program[] = [];

  constructor(private programService: ProgramService, private router: Router) {}


  ngOnInit(): void {
    this.getPrograms();
  }

  public getPrograms(): void {
    this.programService.getPrograms().subscribe((response: Program[]) => this.programs = response);
  }

  public onSearchSubmit(searchInput : string) {
    this.router.navigateByUrl(`/search-subject/${searchInput}`)
  }

}
