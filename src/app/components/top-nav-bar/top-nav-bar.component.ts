import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css'
})
export class TopNavBarComponent {
  @ViewChild('navBar', { static: false }) navBar!: ElementRef;

  public programs: Program[] = [];
  searchValue: string = "";
  isLoggedIn: boolean = false;
  public isHome: boolean = false;
  constructor(private programService: ProgramService, public router: Router, private authService: AuthService, private ref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.getPrograms();
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.url === '/home' || this.router.url === '/';
      }
    });

    this.isHome = this.router.url === '/home' || this.router.url === '/';
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
