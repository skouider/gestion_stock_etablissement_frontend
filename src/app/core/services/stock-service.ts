import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockDTO } from '../../models/stock.dto';
import { StockRequestDTO } from '../../models/stock-request.dto';

@Injectable({
  providedIn: 'root',
})
export class StockService {
    private apiUrl = 'http://localhost:8080/api/v1/stocks';

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<StockDTO[]> {

    return this.http.get<StockDTO[]>(
      this.apiUrl
    );

  }

  getById(id: number): Observable<StockDTO> {

    return this.http.get<StockDTO>(
      `${this.apiUrl}/${id}`
    );

  }

  create(stock: StockRequestDTO): Observable<StockDTO> {

    return this.http.post<StockDTO>(
      this.apiUrl,
      stock
    );

  }

  update(id: number,stock: StockRequestDTO): Observable<StockDTO> {
    return this.http.put<StockDTO>(
      `${this.apiUrl}/${id}`,
      stock
    );

  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }

}
