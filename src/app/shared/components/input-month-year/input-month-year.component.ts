import {ChangeDetectionStrategy, Component, EventEmitter, Input, LOCALE_ID, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import * as _moment from 'moment';
import 'moment/locale/pt-br';
import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-input-month-year',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[
    provideMomentDateAdapter(MY_FORMATS),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  templateUrl: './input-month-year.component.html',
  styleUrl: './input-month-year.component.css'
})
export class InputMonthYearComponent {

  @Input() label = '';
  @Input() defaultValue = '';
  @Output() dateSelected = new EventEmitter();

  readonly date = new FormControl(moment());


  constructor(){
    if(this.defaultValue){
      const dataMoment = moment(this.defaultValue, 'MM/YYYY');
      this.date.setValue(dataMoment);
    }
  }


  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.dateSelected.emit(this.date.value);
  }
}
