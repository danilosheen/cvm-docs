import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelFontSizeService {

  private root = document.documentElement;

  constructor() {}

  setLabelFontSize(size: string) {
    this.root.style.setProperty('--mat-label-font-size', size);
    localStorage.setItem('matLabelSize', size);
  }
}
