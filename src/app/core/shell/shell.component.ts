import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, Platform, ActionSheetOptions } from 'ionic-angular';
import { ActionSheetButton } from 'ionic-angular/components/action-sheet/action-sheet-options';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  navRoot: Component;
  subscription: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private platform: Platform,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.updateNav(this.activatedRoute);

    // Bind Ionic navigation to Angular router events
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateNav(this.activatedRoute));
  }

  get firstname(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.firstname : null;
  }

  get lastname(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.lastname : null;
  }

  private logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  private updateNav(route: ActivatedRoute) {
    if (!route || !route.firstChild) {
      return;
    }
    // First component should always be IonicApp
    route = route.firstChild;
    if (route && route.component === ShellComponent && route.firstChild) {
      route = route.firstChild;
      this.navRoot = <Component>route.component;
    }
  }

}
