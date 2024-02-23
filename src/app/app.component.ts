import { Component } from '@angular/core';

import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { ProgramListComponent } from './components/program-list/program-list.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavBarComponent, ProgramListComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
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
