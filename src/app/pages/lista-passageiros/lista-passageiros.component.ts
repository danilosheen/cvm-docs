import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { InputAutocompleteComponent } from "../../shared/components/input-autocomplete/input-autocomplete.component";
import { ClienteService } from '../../core/services/clienteService/cliente.service';
import { InputNumberComponent } from "../../shared/components/input-number/input-number.component";
import { IInput } from '../../interfaces/i-handlerInput';
import { IPassageiro } from '../../interfaces/i-passageiro';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { ListaPassageirosService } from '../../core/services/listaPassageirosService/lista-passageiros.service';
import { InputTextComponent } from "../../shared/components/input-text/input-text.component";
import { InputDateComponent } from "../../shared/components/input-date/input-date.component";
import { InputTimeComponent } from "../../shared/components/input-time/input-time.component";
import { IListaPassageiros } from '../../interfaces/i-listaPassageiros';
import { AuthService } from '../../core/services/authService/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-passageiros',
  imports: [
    NavbarComponent,
    FooterComponent,
    InputAutocompleteComponent,
    InputNumberComponent,
    MatButtonModule,
    NgIf,
    NgFor,
    InputTextComponent,
    InputDateComponent,
    InputTimeComponent
],
  templateUrl: './lista-passageiros.component.html',
  styleUrl: './lista-passageiros.component.css'
})
export class ListaPassageirosComponent {

  readonly dialog = inject(MatDialog);
  clienteService = inject(ClienteService);
  clientes = this.clienteService.getAllClients();
  arrayNomeClientes: string[] = [];
  listaPassageiros: IListaPassageiros = {
    numeroCarro: '',
    placa: '',
    motorista: '',
    origem: '',
    destino: '',
    dataSaida: '',
    horaSaida: '',
    dataRetorno: '',
    horaRetorno: '',
    extensaoRoteiroKm: '',
    passageiros: [
    ]
  };
  passageiro: IPassageiro = {
    nome: '',
    documento: ''
  };
  valid: boolean[] = [];
  loading = false;
  motoristas: string[] = ["Crairton", "Claudiney"];
  cidades: string[] = ["Juazeiro do Norte", "Crato", "Barbalha"];

  constructor(
    private pdfListaPassageiros: ListaPassageirosService,
    private authService: AuthService,
    private router: Router
  ){

    if(!this.authService.getToken()){
      this.router.navigate(["/"]);
    }

    this.clientes.forEach(element => {
      this.arrayNomeClientes.push(element.nome)
    });

    for (let i = 0; i <= 10; i++) {
      this.valid.push(false)
    }
  }

  onSubmit() {
    this.loading = true;

    this.pdfListaPassageiros.generatePDF(this.listaPassageiros)
      .subscribe(
        (pdfBlob) => {
          // const nomeDestinoFormated = this.formatNomeDestino();
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          const date = new Date();
          link.href = pdfUrl;
          link.download = `Lista de passageiros CVM - ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`;
          link.click();
          this.loading = false;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        },
        (error) => {
          try{
            setTimeout(()=>{
              this.onSubmit();
            }, 1000);
          } catch {
            console.error('Erro ao gerar o PDF:', error);
            this.loading = false;
          }
        }
      );
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, i: number): void {
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dialogTitle: 'Remover passageiro',
        dialogContent: 'Você tem certeza que deseja remover o passageiro?',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.listaPassageiros.passageiros.splice(i, 1);
      }
    });
  }

  adicionarPassageiro(): void {
    this.listaPassageiros.passageiros.push(this.passageiro);
    this.passageiro = {nome: '', documento: ''};
    this.resetArrayValid();
  }

  camposValidos(): boolean {
    for (let i = 9; i < this.valid.length; i++){
      if (this.valid[i] == false){
        return false;
      }
    }
    return true;
  }

  camposViagemPreenchidos(): boolean {
    for (let i = 0; i < 9; i++){
      if (this.valid[i] == false){
        return false;
      }
    }
    return true;
  }

  canGerarPdf(): boolean{
    if(this.listaPassageiros.passageiros.length && this.camposViagemPreenchidos()){
      return true
    }
    return false
  }

  resetArrayValid(): void{
    for(let i = 9; i < this.valid.length; i++){
      this.valid[i] = false;
    }
  }

  updateNumeroCarroHandler(value: IInput){
    this.listaPassageiros.numeroCarro = value.value
    this.valid[0] = value.valid;
  }

  updatePlacaHandler(value: IInput){
    this.listaPassageiros.placa = value.value
    this.valid[1] = value.valid;
  }

  updateMotoristaHandler(value: IInput){
    this.listaPassageiros.motorista = value.value
    this.valid[2] = value.valid;
  }

  updateLocalSaidaHandler(value: IInput){
    this.listaPassageiros.origem = value.value
    this.valid[3] = value.valid;
  }

  updateDestinoHandler(value: IInput){
    this.listaPassageiros.destino = value.value
    this.valid[4] = value.valid;
  }

  updateDataSaidaHandler(value: IInput){
    this.listaPassageiros.dataSaida = value.value
    this.valid[5] = value.valid;
  }

  updateHoraSaidaHandler(value: IInput){
    this.listaPassageiros.horaSaida = value.value
    this.valid[6] = value.valid;
  }

  updateDataRetornoHandler(value: IInput){
    this.listaPassageiros.dataRetorno = value.value
    this.valid[7] = value.valid;
  }

  updateHoraRetornoHandler(value: IInput){
    this.listaPassageiros.horaRetorno = value.value
    this.valid[8] = value.valid;
  }

  updateExtensaoKmHandler(value: IInput){
    this.listaPassageiros.extensaoRoteiroKm = value.value
  }

  updateNomeHandler(value: any){
    this.passageiro.nome = value.value.nome;
    const idSelected = value.value.id;
    this.valid[9] = value.valid;
    this.clientes.forEach(element => {
      if(this.passageiro.nome == element.nome && (element.documento && element.documento != 'Não informado')){
        this.updateDocumentoHandler({ value: element.documento, valid: true});
      }
    });
  }

  updateDocumentoHandler(value: IInput){
    this.passageiro.documento = value.value
    this.valid[10] = value.valid;
  }
}
