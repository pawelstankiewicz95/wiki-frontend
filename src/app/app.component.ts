import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
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
  title = 'wiki-frontend';
}
