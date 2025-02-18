import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PdfOrcamentoService } from '../../core/services/pdfOrcamento/pdf-orcamento.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orcamento',
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './orcamento.component.html',
  styleUrl: './orcamento.component.css'
})
export class OrcamentoComponent {

  name: string = '';
  email: string = '';
  message: string = '';
  loading: boolean = false;

  constructor(private pdfOrcamento: PdfOrcamentoService) {}

  onSubmit() {
    this.loading = true;
    const contractData = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    this.pdfOrcamento.generatePDF(contractData).subscribe(
      (pdfBlob) => {
        this.loading = false;
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'contract.pdf';
        link.click();
      },
      (error) => {
        this.loading = false;
        console.error('Erro ao gerar o PDF:', error);
      }
    );
  }
}
