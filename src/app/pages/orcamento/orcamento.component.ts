import { ChangeDetectionStrategy, Component, NgModule, OnInit, Pipe, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { OrcamentoPDFService } from '../../core/services/orcamentoService/orcamentoPDF.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { finalize, merge, take } from 'rxjs';
import { IOrcamento } from '../../interfaces/i-orcamento';
import { NgIf } from '@angular/common';
import { MY_FORMATS } from './formats';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-orcamento',
  imports: [
    NavbarComponent,
    FooterComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    NgIf,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.css'
})
export class OrcamentoComponent implements OnInit{

  loading: boolean = false;
  errorMessage = signal('');
  orcamentoData: IOrcamento | undefined;
  orcamentoForm: FormGroup<any> = new FormGroup({});

  constructor(private pdfOrcamento: OrcamentoPDFService) {
    Object.keys(this.orcamentoForm.controls).forEach((field) => {
      const control = this.orcamentoForm.get(field);

      // Usando merge corretamente com observáveis de statusChanges e valueChanges
      if (control) {
        merge(control.statusChanges, control.valueChanges)
          .pipe(takeUntilDestroyed())
          .subscribe(() => this.updateErrorMessage());
      }
    });
  }

  ngOnInit() {
    // Inicializando o FormGroup com todos os controles
    this.orcamentoForm = new FormGroup({
      nomeCliente: new FormControl('', [Validators.required]),
      telefoneContato: new FormControl(''),
      pacoteViagem: new FormControl(''),
      localSaida: new FormControl(''),
      dataSaida: new FormControl(''),
      horaSaida: new FormControl(''),
      dataRetorno: new FormControl(''),
      horaRetorno: new FormControl(''),
      valor: new FormControl(''),
      modeloVan: new FormControl('')
    });
  }

  onSubmit() {
    this.loading = true;
    const dadosFormatados = this.formatarDados();

    this.pdfOrcamento.generatePDF(dadosFormatados)
      .subscribe(
        (pdfBlob) => {
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          const date = new Date();
          link.href = pdfUrl;
          link.download = `Orcamento CVM ${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`;
          link.click();
          this.loading = false;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          // window.location.reload();
        },
        (error) => {
          console.error('Erro ao gerar o PDF:', error);
          this.loading = false;
        }
      );
  }


  updateErrorMessage() {
    // Iterando sobre todos os controles do FormGroup
    Object.keys(this.orcamentoForm.controls).forEach((field) => {
      const control = this.orcamentoForm.get(field);

      if (control) {
        // Verificando erros de cada controle individualmente
        if (control.hasError('required')) {
          this.errorMessage.set(`${field} is required`);
        } else if (control.hasError('email')) {
          this.errorMessage.set(`Invalid email format for ${field}`);
        } else {
          this.errorMessage.set('');
        }
      }
    });
  }

  formatarDados(){
    const dadosOrcamento = {
      nomeCliente: this.orcamentoForm.value.nomeCliente,
      telefoneContato: this.orcamentoForm.value.telefoneContato,
      pacoteViagem: this.orcamentoForm.value.pacoteViagem,
      localSaida: this.orcamentoForm.value.localSaida,
      dataSaida: this.orcamentoForm.value.dataSaida.toLocaleString().slice(0, 10),
      horaSaida: this.orcamentoForm.value.horaSaida,
      dataRetorno: this.orcamentoForm.value.dataRetorno.toLocaleString().slice(0, 10),
      horaRetorno: this.orcamentoForm.value.horaRetorno,
      valor: this.orcamentoForm.value.valor,
      modeloVan: this.orcamentoForm.value.modeloVan
    };

    return dadosOrcamento;
  }
}
