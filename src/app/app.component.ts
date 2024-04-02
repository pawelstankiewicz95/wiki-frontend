import { AfterViewChecked, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { ProgramListComponent } from './components/programs/program-list/program-list.component'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavBarComponent, ProgramListComponent, RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  @ViewChild(TopNavBarComponent, { static: false }) topNavBar!: TopNavBarComponent;
  public marginTop: string = '0px'; // Initialize marginTop

  public isHome: boolean = false;

  title = 'wiki-frontend';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHome = this.router.url === '/home' || this.router.url === '/';
      }
    });
  }

}
