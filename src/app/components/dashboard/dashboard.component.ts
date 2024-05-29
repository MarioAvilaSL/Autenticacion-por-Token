import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  token: string | null = null;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.token = this.auth.getToken();
  }


  logout() {
    this.auth.logout();
  }
}