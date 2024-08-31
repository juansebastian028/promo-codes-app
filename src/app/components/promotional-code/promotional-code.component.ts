import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-promotional-code',
  standalone: true,
  imports: [],
  templateUrl: './promotional-code.component.html',
  styleUrl: './promotional-code.component.css'
})
export class PromotionalCodeComponent {
  @Input() promoCode:any

}
