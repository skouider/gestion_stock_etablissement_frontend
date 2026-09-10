import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDTO } from '../../models/article.dto';
import { environment } from '../../../environements/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
   private apiUrl = `${environment.apiUrl}/api/v1/articles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ArticleDTO[]> {

    return this.http.get<ArticleDTO[]>(this.apiUrl);

  }

  getById(id: number): Observable<ArticleDTO> {

    return this.http.get<ArticleDTO>(
      `${this.apiUrl}/${id}`
    );

  }

  getByCode(code: string): Observable<ArticleDTO> {

    return this.http.get<ArticleDTO>(
      `${this.apiUrl}/code/${code}`
    );

  }

  getByStock(stockId: number): Observable<ArticleDTO[]> {

    return this.http.get<ArticleDTO[]>(
      `${this.apiUrl}/stockId`,
      {
        params: {
          stockId: stockId
        }
      }
    );

  }

  search(nom: string): Observable<ArticleDTO[]> {

    return this.http.get<ArticleDTO[]>(
      `${this.apiUrl}/search`,
      {
        params: {
          nom: nom
        }
      }
    );

  }

  save(article: ArticleDTO): Observable<ArticleDTO> {

    return this.http.post<ArticleDTO>(
      this.apiUrl,
      article
    );

  }

  update(
    id: number,
    article: ArticleDTO
  ): Observable<ArticleDTO> {

    return this.http.put<ArticleDTO>(
      `${this.apiUrl}/${id}`,
      article
    );

  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }


}
