import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter, MAT_DATE_LOCALE as MAT_DATE_LOCALE_PROVIDER } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';

// Definição do formato DD/MM/YYYY
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
