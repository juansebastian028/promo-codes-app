import { PromoCodeData } from './../../interfaces/PromoCode';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { PromotionalCodeComponent } from "../../components/promotional-code/promotional-code.component";
import { PromoCodesService } from '../../services/promoCodes/promo-codes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PromotionalCodeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [Validators.required]),
  });
  submitted = false;
  promoCodeData: any;
  showPromoCodeInfo = false;

  
  constructor(
    private _snackbar: SnackbarService,
    private _promoCode: PromoCodesService
  ) {}

  onFormSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this._promoCode.redeemCode(this.form.value).subscribe(
        {
          next: (data: any) => {
            this.promoCodeData = data.data;
            this.showPromoCodeInfo = true;
            this._snackbar.openSnackBar(
              data.message,
              'snackbar-success',
            );
          },
          error: (error) => {
            console.log(error);
            this.showPromoCodeInfo = false;
            this._snackbar.openSnackBar(
              error.error.message,
              'snackbar-error',
            );
          }
        }
      );
      // this.form.setValue({
      //   code: '',
      //   email: '',
      // });
      // this.submitted = false;
    }
  }
}
