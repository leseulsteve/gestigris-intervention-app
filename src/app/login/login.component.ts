import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, AuthenticationService } from '@app/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private authenticationService: AuthenticationService,
    public afAuth: AngularFireAuth) {
    this.createForm();
  }

  ngOnInit() { }

  login() {
    const loading = this.loadingController.create();
    loading.present();
    this.authenticationService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.loginForm.markAsPristine();
        loading.dismiss();
      }))
      .subscribe(credentials => {
        log.debug(`${credentials.username} successfully logged in`);
        this.router.navigate(['/'], { replaceUrl: true });
      }, error => {
        log.debug(`Login error: ${error}`);
        this.error = error;
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
