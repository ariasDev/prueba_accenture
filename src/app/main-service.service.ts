import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  URL_CLIENTES = 'https://testbankapi.firebaseio.com/clients.json'

  constructor(private http: HttpClient) { }

  public getAllClients() {
    return this.http.get(`${this.URL_CLIENTES}`);
  }

  
  public registerNewCustomer(custemerData) {
    return this.http.post(this.URL_CLIENTES, custemerData)
  }
}