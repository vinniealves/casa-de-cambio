import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { MatCardModule } from '@angular/material/card';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-review-order',
  imports: [
    MatTabsModule,
    MatTableModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    CurrencyPipe,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.css',
})
export class ReviewOrderComponent {
  private orderService: OrderService = inject(OrderService);
  public displayedColumns: string[] = [
    'currency_name',
    'value',
    'qtd',
    'total',
    'total_value',
  ];
  public loading = true;
  public order = OrderService.emptyOrder;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.getOrder();
  }

  getOrder() {
    try {
      this.order = this.orderService.getOrder();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: 'Erro ao processar informações',
      });
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  submitOrder() {
    try {
      this.orderService.clearOrder();
      Swal.fire({
        title: 'Pedido realizado',
        text: 'O pedido foi realizado com sucesso',
        icon: 'success',
      });
      this.router.navigate(['/']);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: 'Por favor, tente novamente',
      });
    }
  }
}
