import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelFontSizeService {

  private root = document.documentElement;

  constructor() {
    const matLabelSize = localStorage.getItem('matLabelSize');

    if(matLabelSize){
      this.setLabelFontSize(matLabelSize);
    }
  }

  setLabelFontSize(size: string) {
    this.root.style.setProperty('--mat-label-font-size', size);
    localStorage.setItem('matLabelSize', size);
  }
}
