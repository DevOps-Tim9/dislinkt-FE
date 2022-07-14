import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showNavbar = true;

  constructor(
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.authService.renewAuth();
  }
}
