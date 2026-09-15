/* import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleDTO } from '../../../models/article.dto';
import { ArticleService } from '../../../core/article-service';
import { MouvementForm } from '../../mouvements/mouvement-form/mouvement-form';

@Component({
  selector: 'app-scan-article',
  standalone: true,
  imports: [
    CommonModule,
    MouvementForm
  ],
  templateUrl: './scan-article.html',
  styleUrl: './scan-article.css'
})
export class ScanArticle implements OnInit {

  article: ArticleDTO | null = null;

  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {

    const code = this.route.snapshot.paramMap.get('code');

    console.log('QR - Code reçu :', code);

    if (!code) {
      this.loading = false;
      this.errorMessage = 'Code article manquant.';
      return;
    }

    this.articleService.getByCode(code).subscribe({

      next: (article: ArticleDTO) => {

        console.log('QR - Article trouvé :', article);

        this.article = article;
        this.loading = false;

      },

      error: (error) => {

        console.error('QR - Erreur :', error);

        this.loading = false;

        if (error.status === 404) {

          this.errorMessage =
            `Aucun article trouvé avec le code "${code}".`;

        } else {

          this.errorMessage =
            'Impossible de récupérer l’article.';

        }

      }

    });
  }

  onMouvementValide(): void {

    console.log('Mouvement enregistré');


  }

  onAnnuler(): void {

    this.router.navigate(['/dashboard']);

  }

} */


/* deuxiem code */


/* import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { ArticleService } from '../../../core/article-service';
import { MouvementStockService } from '../../../core/mouvement-stock-service';

import { ArticleDTO } from '../../../models/article.dto';
import { MouvementStockDto } from '../../../models/mouvement-stock.dto';
import { TypeMouvementStock } from '../../../models/type-mouvement-stock.dto';

@Component({
selector: 'app-scan-article',
standalone: true,
imports: [
 CommonModule,
 FormsModule
],
templateUrl: './scan-article.html',
styleUrls: ['./scan-article.css']
})
export class ScanArticle implements OnInit {

 
article: ArticleDTO | null = null;

loading = true;
isSubmitting = false;
errorMessage = '';

typeMouvement: TypeMouvementStock = TypeMouvementStock.ENTREE;
quantite = 1;
departement = '';

TypeMouvementStock = TypeMouvementStock;

codeArticle = '';

constructor(
 private route: ActivatedRoute,
 private router: Router,
 private articleService: ArticleService,
 private mouvementStockService: MouvementStockService
) {}

ngOnInit(): void {

 console.log('=== SCAN ARTICLE ===');

 this.route.paramMap.subscribe(params => {

   const code = params.get('code');

   console.log('QR - Code reçu :', code);

   if (!code) {
     this.loading = false;
     this.errorMessage = 'Aucun code article reçu.';
     return;
   }

   this.codeArticle = code;

   this.rechercherArticle(code);
 });
}

rechercherArticle(code: string): void {

 this.loading = true;
 this.errorMessage = '';
 this.article = null;

 console.log('Recherche de l article :', code);

 this.articleService.getByCode(code).subscribe({

   next: (article: ArticleDTO) => {

     console.log('Article trouvé :', article);

     this.article = article;

     this.loading = false;

     this.typeMouvement = TypeMouvementStock.ENTREE;
     this.quantite = 1;
     this.departement = '';

     console.log('Article affecté à la page :', this.article);
   },

   error: (err) => {

     console.error('Erreur recherche article :', err);

     this.loading = false;
     this.article = null;

     if (err.status === 404) {
       this.errorMessage = `Article ${code} introuvable.`;
     } else {
       this.errorMessage =
         'Impossible de récupérer les informations de cet article.';
     }
   }
 });
}

setType(type: TypeMouvementStock): void {

 this.typeMouvement = type;
 this.errorMessage = '';

 console.log('Type mouvement :', type);
}

valider(): void {

 if (!this.article || !this.article.id) {
   this.errorMessage = 'Article invalide.';
   return;
 }

 if (this.isSubmitting) {
   return;
 }

 if (!this.quantite || this.quantite <= 0) {
   this.errorMessage = 'La quantité doit être supérieure à 0.';
   return;
 }

 if (
   this.typeMouvement === TypeMouvementStock.SORTIE &&
   !this.departement.trim()
 ) {
   this.errorMessage = 'Veuillez renseigner le département destination.';
   return;
 }

 let stockId: number | undefined = undefined;

 if (this.typeMouvement === TypeMouvementStock.SORTIE) {

   const parsedStockId = Number(this.departement);

   if (!isNaN(parsedStockId) && parsedStockId > 0) {
     stockId = parsedStockId;
   }
 }

 const dto: MouvementStockDto = {

   articleId: this.article.id,

   quantite: Number(this.quantite),

   typeMouvement: this.typeMouvement,

   stockId: stockId,

   description:
     `Mouvement de ${this.typeMouvement} depuis le scan QR - Article ${this.article.code}`
 };

 console.log('DTO mouvement envoyé :', dto);

 this.isSubmitting = true;
 this.errorMessage = '';

 const requete$ =
   this.typeMouvement === TypeMouvementStock.ENTREE
     ? this.mouvementStockService.enregistrerEntree(dto)
     : this.mouvementStockService.enregistrerSortie(dto);

 requete$.subscribe({

   next: (response) => {

     console.log('Mouvement enregistré :', response);

     this.isSubmitting = false;

     Swal.fire({
       title: 'Mouvement enregistré !',
       html: `
         <div style="text-align:left; line-height:1.8;">
           <p>
             <strong>Article :</strong>
             ${this.article?.nom}
           </p>

           <p>
             <strong>Code :</strong>
             ${this.article?.code}
           </p>

           <p>
             <strong>Type :</strong>
             ${this.typeMouvement}
           </p>

           <p>
             <strong>Quantité :</strong>
             ${this.quantite}
           </p>
         </div>
       `,
       icon: 'success',
       showCancelButton: true,
       confirmButtonText: 'Scanner un autre produit',
       cancelButtonText: 'Terminer',
       confirmButtonColor: '#16a34a',
       cancelButtonColor: '#6b7280',
       allowOutsideClick: false
     }).then(result => {

       if (result.isConfirmed) {

         this.router.navigate(['/scanner']);

       } else {
         this.router.navigate(['/']);

       }
     });
   },

   error: (err) => {

     console.error('Erreur mouvement :', err);

     this.isSubmitting = false;

     let message =
       "Erreur lors de l'enregistrement du mouvement.";

     if (typeof err.error === 'string') {
       message = err.error;
     } else if (err.error?.message) {
       message = err.error.message;
     }

     this.errorMessage = message;

     Swal.fire({
       title: 'Erreur',
       text: message,
       icon: 'error',
       confirmButtonColor: '#ef4444'
     });
   }
 });
}

annuler(): void {

 this.router.navigate(['/']);
}
} */

/* ***************************************************** */
/* troisieme pour le teste */

/* import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ArticleService } from '../../../core/article-service';
import { MouvementStockService } from '../../../core/mouvement-stock-service';

import { ArticleDTO } from '../../../models/article.dto';
import { MouvementStockDto } from '../../../models/mouvement-stock.dto';
import { TypeMouvementStock } from '../../../models/type-mouvement-stock.dto';

@Component({
  selector: 'app-scan-article',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './scan-article.html',
  styleUrls: ['./scan-article.css']
})
export class ScanArticle implements OnInit {

  article: ArticleDTO | null = null;

  codeArticle = '';

  erreur = '';

  typeMouvement: TypeMouvementStock =
    TypeMouvementStock.ENTREE;

  quantite = 1;

  departement = '';

  isSubmitting = false;

  TypeMouvementStock = TypeMouvementStock;


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private mouvementStockService: MouvementStockService
  ) {}


  ngOnInit(): void {

    console.log('========== SCAN INIT ==========');

    const code =
      this.route.snapshot.paramMap.get('code');

    console.log('Code reçu :', code);

    if (!code) {
      this.erreur = 'Aucun code article.';
      return;
    }

    this.codeArticle = code;

    this.chargerArticle(code);
  }


  chargerArticle(code: string): void {

    console.log('Recherche article :', code);

    this.articleService.getByCode(code).subscribe({

      next: (article: ArticleDTO) => {

        console.log('ARTICLE REÇU :', article);

        this.article = article;

        console.log(
          'ARTICLE DANS LE COMPOSANT :',
          this.article
        );

      },

      error: (err) => {

        console.error(
          'ERREUR ARTICLE :',
          err
        );

        this.erreur =
          'Impossible de récupérer cet article.';
      }

    });
  }


  setType(type: TypeMouvementStock): void {

    this.typeMouvement = type;

    this.erreur = '';
  }


  valider(): void {

    if (!this.article?.id) {

      this.erreur =
        'Article non disponible.';

      return;
    }


    if (this.quantite <= 0) {

      this.erreur =
        'La quantité doit être supérieure à 0.';

      return;
    }


    if (
      this.typeMouvement === TypeMouvementStock.SORTIE &&
      !this.departement.trim()
    ) {

      this.erreur =
        'Veuillez renseigner le département.';

      return;
    }


    const dto: MouvementStockDto = {

      articleId: this.article.id,

      quantite: Number(this.quantite),

      typeMouvement:
        this.typeMouvement,

      description:
        `Mouvement ${this.typeMouvement} - QR ${this.article.code}`
    };


    console.log(
      'DTO envoyé :',
      dto
    );


    this.isSubmitting = true;


    const requete$ =
      this.typeMouvement ===
      TypeMouvementStock.ENTREE

        ? this.mouvementStockService
            .enregistrerEntree(dto)

        : this.mouvementStockService
            .enregistrerSortie(dto);


    requete$.subscribe({

      next: (response) => {

        console.log(
          'MOUVEMENT ENREGISTRÉ :',
          response
        );

        this.isSubmitting = false;

        alert(
          'Mouvement enregistré avec succès !'
        );

        this.chargerArticle(
          this.codeArticle
        );

        this.quantite = 1;
        this.departement = '';
        this.typeMouvement =
          TypeMouvementStock.ENTREE;
      },


      error: (err) => {

        console.error(
          'ERREUR MOUVEMENT :',
          err
        );

        this.isSubmitting = false;

        this.erreur =
          typeof err.error === 'string'
            ? err.error
            : 'Erreur lors de l’enregistrement.';
      }

    });
  }
} */

import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ArticleService } from '../../../core/article-service';
import { MouvementStockService } from '../../../core/mouvement-stock-service';

import { ArticleDTO } from '../../../models/article.dto';
import { MouvementStockDto } from '../../../models/mouvement-stock.dto';
import { TypeMouvementStock } from '../../../models/type-mouvement-stock.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-scan-article',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './scan-article.html',
  styleUrls: ['./scan-article.css']
})
export class ScanArticle implements OnInit {

  article: ArticleDTO | null = null;

  codeArticle = '';

  erreur = '';

  typeMouvement: TypeMouvementStock =
    TypeMouvementStock.ENTREE;

  quantite = 1;

  departement = '';

  isSubmitting = false;

  TypeMouvementStock = TypeMouvementStock;


  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private mouvementStockService: MouvementStockService,
    private cdr: ChangeDetectorRef,
    private router:Router
  ) { }




  ngOnInit(): void {
    console.log('========== SCAN INIT ==========');

    const code = this.route.snapshot.paramMap.get('code');

    console.log('1. Code URL :', code);

    if (!code) {
      this.erreur = 'Aucun code article.';
      return;

    }

    this.codeArticle = code;

    console.log('2. Avant appel API');
    console.log('3. Article avant API :', this.article);


    this.articleService.getByCode(code).subscribe({
      next: (article: ArticleDTO) => {
        console.log('4. API RESPONSE :', article);
        this.article = article;
        console.log('5. Article après affectation :', this.article);
        this.cdr.detectChanges();
        console.log('6. Change detection forcée');
      },

      error: (err) => {
        console.error('6. ERREUR API :', err);
        this.erreur = 'Impossible de récupérer cet article.';
      }
    });
  }




  chargerArticle(code: string): void {

    console.log('Recherche article :', code);

    this.articleService.getByCode(code).subscribe({

      next: (article: ArticleDTO) => {

        console.log('ARTICLE REÇU :', article);

        this.article = article;

        console.log(
          'ARTICLE DANS LE COMPOSANT :',
          this.article
        );

      },

      error: (err) => {

        console.error(
          'ERREUR ARTICLE :',
          err
        );

        this.erreur =
          'Impossible de récupérer cet article.';
      }

    });
  }


  setType(type: TypeMouvementStock): void {

    this.typeMouvement = type;

    this.erreur = '';
  }


  valider(): void {

    if (!this.article?.id) {

      this.erreur =
        'Article non disponible.';

      return;
    }


    if (this.quantite <= 0) {

      this.erreur =
        'La quantité doit être supérieure à 0.';

      return;
    }


    if (
      this.typeMouvement === TypeMouvementStock.SORTIE &&
      !this.departement.trim()
    ) {

      this.erreur =
        'Veuillez renseigner le département.';

      return;
    }


    const dto: MouvementStockDto = {

      articleId: this.article.id,

      quantite: Number(this.quantite),

      typeMouvement:
        this.typeMouvement,

      description:
        `Mouvement ${this.typeMouvement} - QR ${this.article.code}`
    };


    console.log(
      'DTO envoyé :',
      dto
    );


    this.isSubmitting = true;


    const requete$ =
      this.typeMouvement ===
        TypeMouvementStock.ENTREE

        ? this.mouvementStockService
          .enregistrerEntree(dto)

        : this.mouvementStockService
          .enregistrerSortie(dto);


    requete$.subscribe({


      next: (response) => {

        console.log('MOUVEMENT ENREGISTRÉ :', response);

        this.isSubmitting = false;

        Swal.fire({
          icon: 'success',
          title: 'Opération réussie !',
          text: 'Le mouvement a été enregistré avec succès.',
          confirmButtonText: 'Voir l’article',
          confirmButtonColor: '#198754'
        }).then(() => {
          if (this.article?.id) {
            console.log("l'article ID===",this.article?.id);
            
             this.router.navigate(['/articles', this.article.id]);
             }
        });



        this.quantite = 1;
        this.departement = '';
        this.typeMouvement = TypeMouvementStock.ENTREE;
      },



      error: (err) => {

        console.error('ERREUR MOUVEMENT :', err);

        this.isSubmitting = false;

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text:
            typeof err.error === 'string'
              ? err.error
              : 'Une erreur est survenue lors de l’enregistrement du mouvement.',
          confirmButtonText: 'OK'
        });

      },
    });
  }
}

