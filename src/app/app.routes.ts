import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { OrderComponent } from './views/order/order.component';
import { ReviewOrderComponent } from './views/review-order/review-order.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pedido', component: OrderComponent },
  { path: 'revisar-pedido', component: ReviewOrderComponent },
];
