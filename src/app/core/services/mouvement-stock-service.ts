import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MouvementStockDto } from '../../models/mouvement-stock.dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environements/environment';

@Injectable({
  providedIn: 'root',
})
export class MouvementStockService {

  private apiUrl = `${environment.apiUrl}/api/mouvements-stock`;

  constructor(private http: HttpClient) {}


  // Enregistrer une Entrée ou Sortie
  
  enregistrerEntree(dto: MouvementStockDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/entree`, dto);
  }

  enregistrerSortie(dto: MouvementStockDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/sortie`, dto);
  }
  
  entree(articleId: number, quantite: number, description?: string): Observable<MouvementStockDto> {
    let params = new HttpParams()
      .set('articleId', articleId)
      .set('quantite', quantite);

    if (description) {
      params = params.set('description', description);
    }

    return this.http.post<MouvementStockDto>(`${this.apiUrl}/entree`, null, { params });
  }

  sortie(articleId: number, quantite: number, departementId?: number, description?: string): Observable<MouvementStockDto> {
    let params = new HttpParams()
      .set('articleId', articleId)
      .set('quantite', quantite);

    if (departementId != null) {
      params = params.set('departementId', departementId);
    }
    if (description) {
      params = params.set('description', description);
    }

    return this.http.post<MouvementStockDto>(`${this.apiUrl}/sortie`, null, { params });
  }
  
  creerMouvement(mouvement: MouvementStockDto): Observable<MouvementStockDto> {
    return this.http.post<MouvementStockDto>(this.apiUrl, mouvement);
  }

  // Obtenir l'historique global
  getHistorique(): Observable<MouvementStockDto[]> {
    return this.http.get<MouvementStockDto[]>(this.apiUrl);
  }

  // Obtenir l'historique pour un article précis
  getHistoriqueByArticle(articleId: number): Observable<MouvementStockDto[]> {
    return this.http.get<MouvementStockDto[]>(`${this.apiUrl}/article/${articleId}`);
  }
}
