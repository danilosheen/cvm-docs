import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { InputAutocompleteComponent } from "../../shared/components/input-autocomplete/input-autocomplete.component";
import { ClienteService } from '../../core/services/clienteService/cliente.service';
import { ICliente } from '../../interfaces/i-cliente';
import { InputNumberComponent } from "../../shared/components/input-number/input-number.component";
import { IInput } from '../../interfaces/i-handlerInput';
import { IPassageiro } from '../../interfaces/i-passageiro';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import { ListaPassageirosService } from '../../core/services/listaPassageirosService/lista-passageiros.service';

@Component({
  selector: 'app-lista-passageiros',
  imports: [
    NavbarComponent,
    FooterComponent,
    InputAutocompleteComponent,
    InputNumberComponent,
    MatButtonModule,
    NgIf,
    NgFor
  ],
  templateUrl: './lista-passageiros.component.html',
  styleUrl: './lista-passageiros.component.css'
})
export class ListaPassageirosComponent {

  readonly dialog = inject(MatDialog);
  clienteService = inject(ClienteService);
  clientes = this.clienteService.getAllClients();
  arrayNomeClientes: string[] = [];
  listaPassageiros: IPassageiro[] = [];
  passageiro: IPassageiro = {
    nome: '',
    documento: ''
  };
  valid: boolean[] = [];
  loading = false;

  constructor(private pdfListaPassageiros: ListaPassageirosService){
    this.clientes.forEach(element => {
      this.arrayNomeClientes.push(element.nome)
    });

    for (let i = 0; i < 2; i++) {
      this.valid.push(false)
    }
  }

  onSubmit() {
    this.loading = true;

    this.pdfListaPassageiros.generatePDF(this.listaPassageiros)
      .subscribe(
        (pdfBlob) => {
          const nomeDestinoFormated = this.formatNomeDestino();
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement('a');
          const date = new Date();
          link.href = pdfUrl;
          link.download = `Orç. CVM - ${nomeDestinoFormated} ${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.pdf`;
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
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.listaPassageiros.splice(i, 1);
      }
    });
  }

  adicionarPassageiro(): void{
    this.listaPassageiros.push(this.passageiro);
    this.passageiro = {nome: '', documento: ''};
    this.resetArrayValid();
  }

  camposValidos(): boolean{
    for (let i of this.valid){
      if (i == false){
        return false;
      }
    }
    return true;
  }

  resetArrayValid(): void{
    for(let i = 0; i < this.valid.length; i++){
      this.valid[i] = false;
    }
  }

  formatNomeDestino(){
    // try {
    //   const nome = `${this.fichaExcursaoData.cliente.nome.split(" ")[0]}`;
    //   const index = this.fichaExcursaoData.cliente.nome.split(" ")[1].toLocaleLowerCase() === "de" || this.fichaExcursaoData.cliente.nome.split(" ")[1].toLocaleLowerCase() === "da" ? 2 : 1;
    //   const sobrenome = `${this.fichaExcursaoData.cliente.nome.split(" ")[index]}`;
    //   const nomeClienteFormated = `${nome} ${sobrenome}`;
    //   return nomeClienteFormated
    // } catch (error) {
    //   return `${this.fichaExcursaoData.cliente.nome.split(" ")[0]}`;
    // }
  }

  updateNomeHandler(value: IInput){
    this.passageiro.nome = value.value;
    this.valid[0] = value.valid;
    this.clientes.forEach(element => {
      if(this.passageiro.nome == element.nome && (element.documento && element.documento != 'Não informado')){
        this.updateDocumentoHandler({ value: element.documento, valid: true});
      }
    });
  }

  updateDocumentoHandler(value: IInput){
    this.passageiro.documento = value.value
    this.valid[1] = value.valid;
  }
}
