import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ArticleDTO } from '../../../models/article.dto';
import { MouvementStockService } from '../../../core/services/mouvement-stock-service';
import { MouvementStockDto } from '../../../models/mouvement-stock.dto';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TypeMouvementStock } from '../../../models/TypeMouvementStock';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mouvement-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mouvement-form.html',
  styleUrl: './mouvement-form.css',
})
export class MouvementForm {

  @ViewChild('mouvementForm') mouvementForm!: NgForm;

  @Input() article: ArticleDTO | null = null;
  @Output() mouvementValide = new EventEmitter<void>();
  @Output() annuler = new EventEmitter<void>();

  TypeMouvementStock = TypeMouvementStock;

  typeMouvement: TypeMouvementStock = TypeMouvementStock.ENTREE;
  quantite: number = 1;
  departement: string = '';

  errorMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private mouvementStockService: MouvementStockService) {}

  setType(type: TypeMouvementStock): void {
    this.typeMouvement = type;
    this.errorMessage = '';
  }

  valider(): void {
    if (!this.article || !this.article.id || this.isSubmitting) {
      return;
    }

    if (this.quantite <= 0) {
      this.errorMessage = 'La quantité doit être supérieure à 0.';
      return;
    }

    if (this.typeMouvement === TypeMouvementStock.SORTIE && !this.departement) {
      this.errorMessage = 'Veuillez renseigner le département destination.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const dto: MouvementStockDto = {
      articleId: this.article.id,
      quantite: Number(this.quantite),
      typeMouvement: this.typeMouvement,
      stockId: this.departement ? Number(this.departement) : undefined,
      description: `Mouvement de ${this.typeMouvement} depuis l'application`
    };

    const requete$ = (this.typeMouvement === TypeMouvementStock.ENTREE || (this.typeMouvement as string) === 'ENTREE')
      ? this.mouvementStockService.enregistrerEntree(dto)
      : this.mouvementStockService.enregistrerSortie(dto);

    requete$.subscribe({
      next: () => {
        this.isSubmitting = false;

        // Met à jour la quantité locale
        if (this.article) {
          if (this.typeMouvement === TypeMouvementStock.ENTREE) {
            this.article.quantite = (this.article.quantite || 0) + Number(this.quantite);
          } else {
            this.article.quantite = (this.article.quantite || 0) - Number(this.quantite);
          }
        }

        // Demande directement l'action suivante à l'employé
        Swal.fire({
          title: 'Mouvement Enregistré !',
          html: `
            <div style="text-align: left; font-size: 14px; line-height: 1.6;">
              <p><b>Article :</b> ${this.article?.nom}</p>
              <p><b>Type :</b> <span style="color: ${this.typeMouvement === TypeMouvementStock.ENTREE ? '#16a34a' : '#dc2626'}; font-weight: bold;">${this.typeMouvement}</span></p>
              <p><b>Quantité :</b> ${this.quantite} unité(s)</p>
            </div>
            <p style="margin-top: 15px; font-weight: 500;">Que souhaitez-vous faire ?</p>
          `,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: '<i class="fa-solid fa-qrcode"></i> Scanner un autre produit',
          cancelButtonText: 'Terminer',
          confirmButtonColor: '#16a34a',
          cancelButtonColor: '#6b7280',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            // L'employé veut scanner un autre produit
            this.mouvementValide.emit();
          } else {
            // L'employé veut terminer / annuler
            this.annuler.emit();
          }
        });
      },
      error: (err) => {
        this.isSubmitting = false;

        let msg = "Erreur lors de l'enregistrement.";
        if (typeof err.error === 'string') {
          msg = err.error;
        } else if (err.error?.message) {
          msg = err.error.message;
        }

        Swal.fire({
          title: 'Erreur',
          text: msg,
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
    });
  }

  onAnnuler(): void {
    this.annuler.emit();
  }
}