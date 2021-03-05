import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError, tap, timeout } from 'rxjs/operators';

import { Config } from '../../../configs/config';

import { HeadersUtil } from '../_service-util/headers-util';
import { ParamsUtil } from '../_service-util/params-util';

@Injectable({ providedIn: 'root' })
export class CategoriasService {

  private urlApi = '/api/palabras/categorias';
  private endpoint = environment.endpointPalabras + this.urlApi;
  private apiName = Config.apiPalabrasCategorias;

  // Operaciones
  private metodoGetAll = 'getAll';
  private metodoCount = 'count'; // PENDIENTE

  constructor(private http: HttpClient) { }

  getAll(paramsMap: Map<string, string>): Observable<Response> {
    // Headers
    let headers = null;
    headers = HeadersUtil.getHeadersUnknownUser(this.apiName);

    return this.http.get(this.endpoint, { headers: headers, params: ParamsUtil.mapToHttpParams(paramsMap), observe: 'response' })
      .pipe(
        timeout(30000),
        tap(_ => {
          // this.autenticacionService.refreshToken();
        }),
        catchError(this.handleError<any>(`${this.apiName} - ${this.metodoGetAll}`))
      );
  }

  count(paramsMap: Map<string, string>): Observable<number> {

    // Headers
    const headers = HeadersUtil.getHeadersUnknownUser(this.apiName);

    const url = this.endpoint + '/count';
    return this.http.get<number>(url, { headers: headers, params: ParamsUtil.mapToHttpParams(paramsMap) })
      .pipe(
        timeout(30000),
        tap(_ => {
          // this.autenticacionService.refreshToken();
        }),
        catchError(this.handleError<number>(`${this.apiName} - ${this.metodoCount}`))
      );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      switch (error.status) {
        default: {
          console.log('handleError', error);
          // ServiceMessageUtil.isErrorGenerico(error, ServiceMessageUtil.TYPE_NOTIFICATION_ALERT);
          break;
        }
      }

      // console.log('error:', JSON.stringify(error));
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
