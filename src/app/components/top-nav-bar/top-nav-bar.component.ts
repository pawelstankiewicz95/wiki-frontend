import { Component } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css'
})
export class TopNavBarComponent {

  public programs: Program[] = [];
  searchValue: string = "";
  isLoggedIn: boolean = false;
  constructor(private programService: ProgramService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getPrograms();
    if (sessionStorage.getItem('searchInput') != null) {
      this.searchValue = sessionStorage.getItem('searchInput')!;
    }
    this.authService.isLoggedIn$.subscribe(
      loggedIn => this.isLoggedIn = loggedIn
    );
  }

  public getPrograms(): void {
    this.programService.getPrograms().subscribe((response: Program[]) => this.programs = response);
  }

  public onSearchSubmit(searchInput: string) {
    this.router.navigateByUrl(`/search-subject/${searchInput}`);
    sessionStorage.setItem(searchInput, searchInput);
  }

  public logout() {
    this.authService.logout();
  }

}
