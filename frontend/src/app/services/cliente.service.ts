import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { Cliente } from 'src/app/models/cliente.model'
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Conta } from '../models/conta.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  create(cliente: Cliente): Observable<Cliente> {
    const url =`${environment.baseUrl}/clientes`;

    return this.http.post<Cliente>(url, cliente).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError? ['msg-error'] : ['msg-success']
    })
  }
}
