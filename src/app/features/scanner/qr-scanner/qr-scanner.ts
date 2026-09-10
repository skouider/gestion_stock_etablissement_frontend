import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Optionnel si vous souhaitez rediriger
import { ArticleDTO } from '../../../models/article.dto';
import { ArticleService } from '../../../core/services/article-service';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { MouvementForm } from '../../mouvements/mouvement-form/mouvement-form';

@Component({
  selector: 'app-qr-scanner',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule, MouvementForm],
  templateUrl: './qr-scanner.html',
  styleUrl: './qr-scanner.css',
})
export class QrScanner {

  allowedFormats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  isScanning = true;
  errorMessage = '';
  article: ArticleDTO | null = null;

  constructor(
    private articleService: ArticleService,
    private router: Router // Injection du Router Angular
  ) {}

  onScanSuccess(codeScanne: string): void {
    if (!this.isScanning) return;

    this.errorMessage = '';

    this.articleService.getByCode(codeScanne).subscribe({
      next: (data) => {
        this.article = data;
        this.isScanning = false;
      },
      error: () => {
        this.errorMessage = `Article non trouvé pour le code : ${codeScanne}`;
        this.isScanning = true;
      }
    });
  }

  // APPELÉ QUAND L'UTILISATEUR CLIQUE SUR "SCANNER UN AUTRE PRODUIT"
  resetWorkflow(): void {
    this.article = null;
    this.errorMessage = '';
    this.isScanning = true;
  }

  // APPELÉ QUAND L'UTILISATEUR CLIQUE SUR "TERMINER"
  terminerSession(): void {
    this.article = null;
    this.errorMessage = '';
    this.isScanning = false; // La caméra reste coupée

    // Choix A : Rediriger vers la liste des articles ou l'accueil
    this.router.navigate(['/articles']); 

    // OU Choix B : Rester sur la page mais fermer complètement la caméra
  }
}