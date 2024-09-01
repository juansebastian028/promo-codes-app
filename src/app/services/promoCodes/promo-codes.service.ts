import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { PromoCode } from '../../interfaces/PromoCode';


@Injectable({
  providedIn: 'root'
})
export class PromoCodesService {
  path: string = '';
  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
  }

  redeemCode(promoCode: PromoCode): Observable<PromoCode> {
    const params = new HttpParams()
      .set('email', promoCode.email)
      .set('code', promoCode.code);
      
    return this.http.post<PromoCode>(`${this.path}/promo-codes/redeem`, {}, { params });
  }

}
