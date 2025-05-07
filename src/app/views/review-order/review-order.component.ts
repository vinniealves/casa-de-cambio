import { Component } from '@angular/core';
import { Order, STORAGE_KEY } from '../order/order.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-review-order',
  imports: [
    MatTabsModule,
    MatTableModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.css',
})
export class ReviewOrderComponent {
  constructor(private router: Router) {}

  displayedColumns: string[] = [
    'currency_name',
    'value',
    'qtd',
    'total',
    'total_value',
  ];
  loading = true;
  order: Order = {
    list: [],
    user: {
      name: '',
      document: '',
      email: '',
      phone: '',
    },
    total: 0,
    total_value: 0,
  };

  ngOnInit() {
    this.loading = true;
    this.getOrder();
  }

  getOrder() {
    try {
      const savedOrder = localStorage.getItem(STORAGE_KEY);
      const orderJson = JSON.parse(savedOrder as string).order;
      if (orderJson) {
        this.order = orderJson;
      }
    } catch (error) {
      alert('Erro ao processar informações');
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  submitOrder() {
    localStorage.removeItem(STORAGE_KEY);
    alert('Pedido realizado com sucesso');
    this.router.navigate(['/']);
  }
}
