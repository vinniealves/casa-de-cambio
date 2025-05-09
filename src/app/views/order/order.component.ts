import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import Swal from 'sweetalert2';
import { Currency, User } from '../../@types';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  imports: [
    MatTabsModule,
    MatTableModule,
    FormsModule,
    CurrencyPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    ReactiveFormsModule,
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
  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    document: [
      '',
      Validators.compose([Validators.required, Validators.minLength(11)]),
    ],
    phone: [
      '',
      Validators.compose([Validators.required, Validators.minLength(11)]),
    ],
  });

  constructor(private router: Router) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      this.loading = true;
      this.data = await this.orderService.getCurrencies();
      const order = await this.orderService.getOrder();
      if (order?.user) {
        this.form.patchValue(order.user);
      }
    } catch (error) {
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

    let total = [];
    let total_value = [];
    for (let item of this.data) {
      total.push(
        item.order_config.reduce((prev, curr) => prev + curr.total, 0)
      );
      total_value.push(
        item.order_config.reduce((prev, curr) => prev + curr.total_value, 0)
      );
    }

    this.order.total = total.reduce((prev, curr) => prev + curr);
    this.order.total_value = total_value.reduce((prev, curr) => prev + curr);
  }

  saveOrder() {
    if (this.order.total_value < 100) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'O valor mínimo do pedido é de R$100,00',
      });

      return;
    }
    this.order.user = this.form.value as User;
    this.orderService.saveOrder(this.data, this.order);
    this.router.navigate(['/revisar-pedido']);
  }
}
