import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleService } from '../../../core/article-service';
import { ArticleDTO } from '../../../models/article.dto';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.html',
  styleUrls: ['./article-detail.css']
})
export class ArticleDetail implements OnInit {

  article: ArticleDTO | null = null;

  loading = true;
  erreur = '';

  imageArticleUrl: string | null = null;
  imageError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    console.log('========== ARTICLE DETAIL ==========');
    console.log('ID article :', id);

    if (!id) {
      this.erreur = 'Aucun article sélectionné.';
      this.loading = false;

      this.cdr.detectChanges();

      return;
    }

    this.chargerArticle(Number(id));
  }

  chargerArticle(id: number): void {

    this.loading = true;

    this.articleService.getById(id).subscribe({

      next: (article: ArticleDTO) => {

        console.log('Article détail reçu :', article);

        this.article = article;
        this.imageArticleUrl = `${environment.apiUrl}/api/v1/articles/${article.id}/image`;
        this.imageError = false;
        this.loading = false;

        // Force Angular à mettre à jour la vue
        this.cdr.detectChanges();

        console.log('Article affiché :', this.article);

      },

      error: (err) => {

        console.error('Erreur récupération article :', err);

        this.loading = false;
        this.erreur =
          'Impossible de récupérer les informations de l’article.';

        this.cdr.detectChanges();

      }

    });
  }

  /**
   * Repli propre si l'image n'existe pas ou échoue au chargement
   */
  onImageError(): void {
    this.imageError = true;
    this.cdr.detectChanges();
  }

  /**
   * Scanner un autre article
   */
  scannerAutreArticle(): void {

    console.log('Retour au scanner');

    this.router.navigate(['/scan']);
  }

  /**
   * Corriger / Mouvement inverse
   */
  corrigerMouvement(): void {

    if (!this.article?.id) {
      return;
    }

    console.log(
      'Correction du mouvement pour article :',
      this.article.id
    );

    this.router.navigate(
      ['/mouvements/new'],
      {
        queryParams: {
          articleId: this.article.id
        }
      }
    );
  }

}