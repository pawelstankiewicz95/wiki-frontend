import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { Program } from '../../models/program';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';

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
  public username: string | null = null;
  public userRole: string = '';

  constructor(
    private programService: ProgramService,
    public router: Router,
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.authService.user$.subscribe(username => {
          if (username) {
            this.userService.getRole(username).pipe(
                map((response: any) => response.role) // Extracting the 'role' property from the response
            ).subscribe(role => {
                this.userRole = role; // Assigning the role to a variable
                console.log(this.userRole); // Logging the role value
            });
        }
          this.username = username
          console.log(username)
        })
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
