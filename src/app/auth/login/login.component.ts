import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscription: Subscription

  constructor(private AuthService: AuthService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ui').subscribe ( ui => this.cargando = ui.isLoading)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data: any ) {


    this.AuthService.login(data.email, data.password)

  }

}
