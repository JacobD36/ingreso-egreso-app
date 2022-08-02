import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  user!: Usuario | null;
  userSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private route: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').subscribe(({user}) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
      this.userSubs.unsubscribe();
  }

  logout() {
    this.authService.logout().then((resp) => {
      this.route.navigateByUrl('/login');
    });
  }
}
