import { Component, OnInit } from '@angular/core';
import { LabelFontSizeService } from '../../../core/services/labelFontSizeService/label-font-size.service';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button-change-label-font-size',
  imports: [MatIcon, NgClass],
  templateUrl: './button-change-label-font-size.component.html',
  styleUrl: './button-change-label-font-size.component.css'
})
export class ButtonChangeLabelFontSizeComponent {
  private tamanho = 16; // px
  buttonOpen = false;
  animationsEnabled = false;

  constructor(private fontSize: LabelFontSizeService) {}

  aumentar() {
    this.tamanho += 2;
    this.fontSize.setLabelFontSize(this.tamanho + 'px');
  }

  diminuir() {
    this.tamanho = Math.max(10, this.tamanho - 2);
    this.fontSize.setLabelFontSize(this.tamanho + 'px');
  }

  resetar() {
    this.tamanho = 16;
    this.fontSize.setLabelFontSize(this.tamanho + 'px');
  }

  openCloseButton(){
    this.buttonOpen = !this.buttonOpen;
  }
}
