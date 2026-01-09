import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { LoadingBlueComponent } from "../../shared/components/loading-blue/loading-blue.component";
import { BehaviorSubjectService } from '../../core/services/behaviorSubjectService/behavior-subject.service';
import { UsuariosService } from '../../core/services/usuariosService/usuarios.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenericComponent } from '../../shared/components/dialog-generic/dialog-generic.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { PermissaoService } from '../../core/services/permissaoService/permissao.service';
import { DialogUsuarioComponent } from '../../shared/components/dialog-usuario/dialog-usuario.component';
import { IUsuario } from '../../interfaces/i-usuario';

@Component({
  selector: 'app-gerenciar-usuarios',
  imports: [
    NavbarComponent,
    FooterComponent,
    LoadingBlueComponent,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './gerenciar-usuarios.component.html',
  styleUrl: './gerenciar-usuarios.component.css'
})
export class GerenciarUsuariosComponent {

  usuariosService = inject(UsuariosService);
  permissoesService = inject(PermissaoService);
  permissoesBehaviorSubject = inject(BehaviorSubjectService);
  readonly dialog = inject(MatDialog);
  permissoes: string[] = [];
  usuarios: any[] = [];
  isChecked = true;
  isLoadingPermissoes = false;

  constructor(){

    // carregar usuários
    this.isLoadingPermissoes = true;
    this.usuariosService.getAll().subscribe({
      next:(usuarios)=>{
        this.usuarios = usuarios;
        this.isLoadingPermissoes = false;
      },
      error:(error)=>{
        this.isLoadingPermissoes = false;
        console.log(error);
      }
    });
  }

  criarUsuario(){
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      data: {
        title: 'criar',
        confirmButton: 'Salvar'
      }
    });

    dialogRef.afterClosed().subscribe((usuario: IUsuario) => {
      if (usuario) {
        this.usuariosService.criarUsuario(usuario).subscribe({
          next:(response) => {
            this.usuarios = [...this.usuarios, response];
          },
          error:(error) => {
            console.log(error);
          }
        })
      }
    });
  }

  editarUsuario(usuario: IUsuario){
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      data: {
        usuario: usuario,
        title: 'atualizar',
        confirmButton: 'Atualizar'
      }
    });

    dialogRef.afterClosed().subscribe((usuario: IUsuario) => {
      if (usuario) {
        this.usuariosService.alterarSenha(usuario.email, usuario.senha).subscribe({
          next:(response) => {
            console.log(response)
          },
          error:(error) => {
            console.log(error)
          }
        })
      }
    });
  }

  removerUsuario(enterAnimationDuration: string, exitAnimationDuration: string, userId: string): void {
    const dialogRef = this.dialog.open(DialogGenericComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        dialogTitle: 'Remover usuário',
        dialogContent: 'Você tem certeza que deseja remover o usuário?',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.usuariosService.removerUsuario(userId).subscribe({
          next: (response) => {
            console.log(response);
            this.usuarios = this.usuarios.filter(u => u.id !== userId);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  atualizarPermissao(permissaoId: string, permitido: boolean){
    this.permissoesService.updatePermissao(permissaoId, permitido).subscribe({
      next:(data) =>{
        console.log(data.message);
      },
      error:(error) =>{
        console.log(error);
      }
    });
  }

  formatarNomePermissao(nomePermissao: string): string {
    const nomesPermissoesFormatados: Record<string, string> = {
      calculadora: 'Calculadora',
      clientes: 'Gerenciar clientes',
      contrato: 'Criar contratos',
      'contrato-history': 'Histórico de contratos',
      'controle-contas': 'Entradas e saídas',
      'ficha-excursao': 'Ficha de excursão',
      'lista-passageiros': 'Lista de passageiros',
      'lista-passageiros-history': 'Histórico da lista de passageiros',
      orcamento: 'Orçamento',
      'orcamento-history': 'Histórico de orçamentos',
      passageiros: 'Gerenciar passageiros',
      recibo: 'Criar recibos',
      utilitarios: 'Utilitários',
    };

    // Busca a chave correspondente
    return nomesPermissoesFormatados[nomePermissao] || nomePermissao;
  }


}
