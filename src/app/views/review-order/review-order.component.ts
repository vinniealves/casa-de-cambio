import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Order } from '../../@types';
import { OrderService } from '../../services/order.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-review-order',
  imports: [
    MatTabsModule,
    MatTableModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    CurrencyPipe,
  ],
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.css',
})
export class ReviewOrderComponent {
  private orderService: OrderService = inject(OrderService);

  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'currency_name',
    'value',
    'qtd',
    'total',
    'total_value',
  ];
  loading = true;
  public order = OrderService.emptyOrder;

  ngOnInit() {
    this.loading = true;
    this.getOrder();
  }

  getOrder() {
    try {
      this.order = this.orderService.getOrder();
    } catch (error) {
      alert('Erro ao processar informações');
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  submitOrder() {
    this.orderService.clearOrder();
    alert('Pedido realizado com sucesso');
    this.router.navigate(['/']);
  }
}
