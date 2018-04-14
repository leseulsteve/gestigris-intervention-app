import { Component, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpParams } from '@angular/common/http';

import * as mapStyles from './etablissement-map-styles.json';

import { Etablissement } from './etablissement';

@Component({
  selector: 'app-etablissement-card-header',
  templateUrl: './etablissement-card-header.component.html',
  styleUrls: ['./etablissement-card-header.component.scss']
})
export class EtablissementCardHeaderComponent implements AfterViewInit, OnDestroy {

  @Input() etablissement: Etablissement;
  mapImage: string | SafeUrl;

  private defaultImage = 'http://content.stamen.com/files/just_the_streets/soho_lines.jpg';
  private destroy$ = new Subject();

  favorited: boolean;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  ngAfterViewInit() {

    this.etablissement.favorited$
      .takeUntil(this.destroy$)
      .subscribe(favorited => this.favorited = favorited);

    this.http
      .get('https://maps.googleapis.com/maps/api/staticmap', {
        responseType: 'blob',
        params: new HttpParams()
          .set('maptype', 'satellite')
          .set('styles', mapStyles)
          .set('center', this.etablissement.description)
          .set('key', 'AIzaSyCjdG1JAD4hhyf117P3ldaVG-uAP0fCFdU')
          .set('zoom', this.etablissement.coordinates.zoomLevel.toString())
          .set('size', '350x200')
      })
      .takeUntil(this.destroy$)
      .catch(error => {
        this.mapImage = this.defaultImage;
        return error;
      })
      .map(blob => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)))
      .subscribe(imageUrl => {
        this.mapImage = imageUrl;
      });
  }

  ngOnDestroy() { this.destroy$.next(); }

}
