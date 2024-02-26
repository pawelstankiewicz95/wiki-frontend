import { AfterViewChecked, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { ProgramListComponent } from './components/program-list/program-list.component'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavBarComponent, ProgramListComponent, RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewChecked {
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustMargin();
  }


  ngAfterViewChecked(): void {
    this.adjustMargin();
  }

  adjustMargin(): void {
    if (this.topNavBar && this.topNavBar.navBar) {
      const navHeight = this.topNavBar.navBar.nativeElement.offsetHeight;
      this.marginTop = navHeight + 100 + 'px'; // Update marginTop
      console.log(this.marginTop);
    }
  }
}
