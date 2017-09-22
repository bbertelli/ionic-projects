import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";

/*
  Generated class for the RestapiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestapiServiceProvider {
  data: any;
  apiUrl = "http://localhost:8080/crm-api/api";

  constructor(public http: Http) {}

  postRequest(serviceUrl: string, params: any) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let options = new RequestOptions({ headers: headers, params: params });

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + serviceUrl, params, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  postRequestPrivate(
    serviceUrl: string,
    params: any,
    body: any,
    token: string
  ) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    let options = new RequestOptions({ headers: headers, params: params });

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise((resolve, reject) => {
      this.http
        .post(this.apiUrl + serviceUrl, body, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  postRequestPrivateNoContent(
    serviceUrl: string,
    params: any,
    body: any,
    token: string
  ) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    let options = new RequestOptions({ headers: headers, params: params });

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + serviceUrl, body, options).subscribe(
        res => {
          // em caso de sucesso devolve o resolve sem conteudo
          resolve();
        },
        err => {
          reject(err);
        }
      );
    });
  }

  getRequest(serviceUrl: string, params: any, token: string) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    let options = new RequestOptions({ headers: headers, params: params });

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise((resolve, reject) => {
      this.http
        .get(this.apiUrl + serviceUrl, options)
        .map(res => res.json())
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getRequestNoContent(serviceUrl: string, params: any, token: string) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token);

    let options = new RequestOptions({ headers: headers, params: params });

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl + serviceUrl, options).subscribe(
        res => {
          // em caso de sucesso devolve o resolve sem conteudo
          resolve();
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
