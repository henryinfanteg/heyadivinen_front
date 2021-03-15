import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Config } from '../../configs/config';
import { catchError, tap, timeout } from 'rxjs/operators';

import { HeadersUtil } from '../../core/services/_service-util/headers-util';
import { Contacto } from 'src/app/shared/models/contacto';

@Injectable({ providedIn: 'root' })
export class ContactService {

  private urlApi = '/api/contacto/contacto';
  private endpoint = environment.endpointContacto + this.urlApi;
  private apiName = Config.apiContacto;

  // Operaciones
  private metodoAdd = 'add';

  constructor(private http: HttpClient) { }

  add(obj: Contacto): Observable<Response> {

    // Headers
    let headers = null;
    headers = HeadersUtil.getHeadersUnknownUser(this.apiName);

    return this.http.post(this.endpoint, obj, { headers: headers, observe: 'response' })
      .pipe(
        timeout(30000),
        tap(_ => {
          // this.autenticacionService.refreshToken();
        }),
        catchError(this.handleError<any>(`${this.apiName} - ${this.metodoAdd}`))
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

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
