import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-protegidos',
  templateUrl: './protegidos.component.html',
  styleUrl: './protegidos.component.css'
})
export class ProtegidosComponent {
  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }
}
