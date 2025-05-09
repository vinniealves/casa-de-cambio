import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Currency } from '../../@types';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  imports: [
    MatTabsModule,
    MatTableModule,
    FormsModule,
    CurrencyPipe,
    NgxMaskDirective,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  private orderService: OrderService = inject(OrderService);
  public data: Currency[] = [];
  public loading: boolean = false;
  public displayedColumns: string[] = ['value', 'qtd', 'total', 'total_value'];
  public order = OrderService.emptyOrder;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.getData();
  }

  async getData() {
    try {
      this.data = await this.orderService.getCurrencies();
    } catch (error) {
      alert('Ocorreu um erro ao carregar informações');
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  updateValue(event: Event, dataIndex: number, faceIndex: number) {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);

    const orderConfigArr = this.data[dataIndex].order_config;
    const orderConfig = this.data[dataIndex].order_config[faceIndex];
    const dataConfig = this.data[dataIndex];

    orderConfig.currency_name = dataConfig.nome;
    orderConfig.currency_id = dataConfig.id;
    orderConfig.qtd = value;
    orderConfig.total = Number((value * orderConfig.value).toFixed(2));
    orderConfig.total_value = Number(
      (value * dataConfig.cotacao * orderConfig.value).toFixed(2)
    );

    this.data[dataIndex].order_config[faceIndex] = orderConfig;

    this.order.total = orderConfigArr.reduce(
      (prev, curr) => prev + curr.total,
      this.order.total
    );
    this.order.total_value = orderConfigArr.reduce(
      (prev, curr) => prev + curr.total_value,
      this.order.total_value
    );
  }

  saveOrder() {
    if (this.order.total_value < 100) {
      alert('O pedido precisa ter um valor de no mínimo R$100,00');
      return;
    }
    this.orderService.saveOrder(this.data, this.order);
    this.router.navigate(['/revisar-pedido']);
  }
}
