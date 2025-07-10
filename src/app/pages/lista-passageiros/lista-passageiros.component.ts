import { Component, inject, OnInit } from '@angular/core';
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
import { IPessoaAutocomplete } from '../../interfaces/i-clienteAutocomplete';
import { ICliente } from '../../interfaces/i-cliente';
import { DialogPassageiroComponent } from '../../shared/components/dialog-passageiro/dialog-passageiro.component';
import { InputRadioComponent } from "../../shared/components/input-radio/input-radio.component";
import { PassageiroService } from '../../core/services/passageiroService/passageiro-service.service';
import { InputAutocompleteDataPessoaComponent } from "../../shared/components/input-autocomplete-data-client/input-autocomplete-data-pessoa.component";
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { BehaviorSubjectService } from '../../core/services/behaviorSubjectService/behavior-subject.service';
import { ListaPassageirosHistoryService } from '../../core/services/listaPassageirosHistoryService/lista-passageiros-history.service';
// import { InputAutocompleteDataCLientComponent } from "../../shared/components/input-autocomplete-data-client/input-autocomplete-data-client.component";

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
    InputTimeComponent,
    InputRadioComponent,
    InputAutocompleteDataPessoaComponent,
    LoadingBlueComponent
],
  templateUrl: './lista-passageiros.component.html',
  styleUrl: './lista-passageiros.component.css'
})
export class ListaPassageirosComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  readonly dialogPassageiro = inject(MatDialog);

  clienteService = inject(ClienteService);
  passageiroService = inject(PassageiroService);

  clientes: ICliente[] = [];
  passageiros: IPassageiro[] = [];

  arrayNomeClientes: IPessoaAutocomplete[] = [];
  arrayNomePassageiros: IPessoaAutocomplete[] = [];
  // arrayNomePassageiros: IClienteAutocomplete[] = [];

  listaPassageiros: IListaPassageiros;

  passageiro: IPassageiro = {
    nome: '',
    documento: '',
    typeDocumentSelected: 'RG'
  };

  listaPassageirosBehaviorSubject = inject(BehaviorSubjectService);
  listaPassageirosHistoryService = inject(ListaPassageirosHistoryService);
  valid: boolean[] = [];
  loading = false;
  isLoadingPassageiros = true;
  motoristas: string[] = ["Crairton", "Claudiney"];
  cidades: string[] = ["Juazeiro do Norte", "Crato", "Barbalha"];
  typesDocument: string[] = ['RG', 'CPF', 'Registro'];
  isLoadingListaPassageirosBehaviorSubject = true;

  constructor(
    private pdfListaPassageiros: ListaPassageirosService){
    for (let i = 0; i <= 10; i++) {
      this.valid.push(false)
    }

    this.listaPassageiros = {
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
    }

    this.updateNumeroCarroHandler({ value: 25152001, valid: true });
    this.updatePlacaHandler({ value: 'OSQ1619', valid: true });

    // nav vindo do history
    this.listaPassageirosBehaviorSubject.listaPassageirosSelecionado$.subscribe(data => {
      if (data) {
        this.listaPassageiros = data;
        this.isLoadingListaPassageirosBehaviorSubject = false;
      } else {
        this.isLoadingListaPassageirosBehaviorSubject = false;
      }
    });
  }

  ngOnInit(): void {
    // this.povoaArrayClientes();
    this.povoaArrayPassageiros();
  }

  onSubmit() {
    this.loading = true;
    const date = new Date();
    const pdfName = `Lista de passageiros CVM - ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`
    this.tryGenerateListaPassageirosPdf(pdfName);
    this.createListaPassageirosHistory();
  }

  tryGenerateListaPassageirosPdf(pdfName: string){
    this.pdfListaPassageiros.generatePDF({pdfData: this.listaPassageiros, pdfName: pdfName})
      .subscribe(
        (pdfBlob) => {
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.download = pdfName;
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

  createListaPassageirosHistory(){
    this.listaPassageirosHistoryService.createListaPassageirosHistory(this.listaPassageiros).subscribe({
      next:(result)=>{
        console.log(result);
      },
      error:(error)=>{
        console.log(error);
      }
    });
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

  povoaArrayClientes(){
    this.clienteService.getAll().subscribe(element => {
      this.clientes = element;
      for(let cliente of element){
        this.arrayNomeClientes.push({nome: cliente.nome, id: cliente.id})
      }
    });
  }

  povoaArrayPassageiros(){
    this.passageiroService.getAll().subscribe(passageiros =>{
      this.passageiros = passageiros;
      for(let passageiro of this.passageiros){
        this.arrayNomePassageiros.push({nome: passageiro.nome, id: passageiro.id!});
      }
      this.isLoadingPassageiros = false;
    });
  }

  adicionarPassageiro(): void {
    if(this.verificaPassageiroNovo(this.passageiro.documento)){
      if(this.passageiro.typeDocumentSelected == 'Registro'){
        this.passageiro.nome = `${this.passageiro.nome} (criança)`
      }
      this.passageiroService.create(this.passageiro).subscribe(passageiro =>{
        this.arrayNomePassageiros.push({nome: passageiro.nome, id: passageiro.id!});
        this.listaPassageiros.passageiros.push(this.passageiro);
        this.passageiros.push(this.passageiro);
        this.passageiro = {nome: '', documento: '', typeDocumentSelected: 'RG'};
      });
    } else {
      if(this.listaPassageiros.passageiros.filter(p => p.documento == this.passageiro.documento).length > 0){
        alert("Já existe um passageiro com este documento.")
      } else {
        this.listaPassageiros.passageiros.push(this.passageiro);
        this.passageiros.push(this.passageiro);
      }
      this.passageiro = {nome: '', documento: '', typeDocumentSelected: 'RG'};
    }
    this.resetArrayValid();
  }

  editPassageiro(index: number){
    const dialogRef = this.dialogPassageiro.open(DialogPassageiroComponent, {
      data: {
        passageiro: this.listaPassageiros.passageiros[index],
        title: 'atualizar',
        confirmButton: 'Salvar'
      }
    });

    dialogRef.afterClosed().subscribe((passageiro: IPassageiro) => {
      if (passageiro) {
        let passageiroData = {nome: passageiro.nome, documento: passageiro.documento, typeDocumentSelected: passageiro.typeDocumentSelected}
        this.listaPassageiros.passageiros[index] = passageiroData;
      }
    });
  }

  verificaPassageiroNovo(documento: string): boolean{
    const passageiroRegistrado = this.passageiros.filter(passageiro => passageiro.documento == documento);
    if(passageiroRegistrado.length == 0){
      return true;
    }
    return false;
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

  updateNumeroCarroHandler(value: IInput<number>){
    this.listaPassageiros.numeroCarro = value.value.toString();
    this.valid[0] = value.valid;
  }

  updatePlacaHandler(value: IInput<string>){
    this.listaPassageiros.placa = value.value
    this.valid[1] = value.valid;
  }

  updateMotoristaHandler(value: IInput<string>){
    this.listaPassageiros.motorista = value.value
    this.valid[2] = value.valid;
  }

  updateLocalSaidaHandler(value: IInput<string>){
    this.listaPassageiros.origem = value.value
    this.valid[3] = value.valid;
  }

  updateDestinoHandler(value: IInput<string>){
    this.listaPassageiros.destino = value.value
    this.valid[4] = value.valid;
  }

  updateDataSaidaHandler(value: IInput<string>){
    this.listaPassageiros.dataSaida = value.value
    this.valid[5] = value.valid;
  }

  updateHoraSaidaHandler(value: IInput<string>){
    this.listaPassageiros.horaSaida = value.value
    this.valid[6] = value.valid;
  }

  updateDataRetornoHandler(value: IInput<string>){
    this.listaPassageiros.dataRetorno = value.value
    this.valid[7] = value.valid;
  }

  updateHoraRetornoHandler(value: IInput<string>){
    this.listaPassageiros.horaRetorno = value.value
    this.valid[8] = value.valid;
  }

  updateExtensaoKmHandler(value: IInput<number>){
    this.listaPassageiros.extensaoRoteiroKm = value.value.toString();
  }

  updateNomeHandler(value: any){
    const idSelected = value.value.id;
    if(idSelected){
      this.passageiro.nome = value.value.nome;
      this.passageiros.forEach(passageiro => {
        if(idSelected == passageiro.id){
          this.updateDocumentSelectedHandler({ value: passageiro.typeDocumentSelected, valid: true});
          this.updateDocumentoHandler({ value: passageiro.documento, valid: true});
        }
      });
    } else {
      this.passageiro.nome = value.value.nome;
      if(value.value.nome == ''){
        this.updateDocumentSelectedHandler({ value: 'RG', valid: true});
        this.updateDocumentoHandler({ value: '', valid: false});
      }
    }
    this.valid[9] = value.valid;
  }

  updateDocumentSelectedHandler(value: IInput<string>){
    if (this.passageiro.typeDocumentSelected !== value.value) {
      this.passageiro.documento = '';
    }
    this.passageiro.typeDocumentSelected = value.value;
  }

  updateDocumentoHandler(value: IInput<string>){
    this.passageiro.documento = value.value
    this.valid[10] = value.valid;
  }
}
