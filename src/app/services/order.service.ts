import { Injectable } from '@angular/core';
import { Currency, Order } from '../@types';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly baseUrl =
    'https://qugkx0grkb.execute-api.sa-east-1.amazonaws.com/api/moedas';

  readonly storageKey = 'CASA_DE_CAMBIO';

  static emptyOrder: Order = {
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

  constructor() {}

  async getCurrencies(): Promise<Currency[]> {
    try {
      let data: Currency[] = [];
      const savedData = localStorage.getItem(this.storageKey);
      const dataJson = JSON.parse(savedData as string);
      if (dataJson?.data) return dataJson.data;

      const res = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'x-api-key': 'cmobRsEsmKaH8OoGLjRPg3zPGtlpqZvdR4Vsf3j5',
        },
      });

      const resJson = await res.json();

      data = resJson.map((elem: Currency) => ({
        ...elem,
        formatted_currency_value: elem.cotacao.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        order_config: elem.faces.map((elem) => ({
          value: elem,
          qtd: 0,
          total: 0,
          total_value: 0,
        })),
      }));

      return data;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  saveOrder(data: Currency[], order: Omit<Order, 'list'>) {
    const list = [];

    for (let item of data) {
      for (let faceConfig of item.order_config) {
        if (faceConfig.qtd) list.push(faceConfig);
      }
    }

    const orderObj: Order = {
      list,
      user: order.user,
      total: order.total,
      total_value: order.total_value,
    };

    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        order: orderObj,
        data: data,
      })
    );
  }

  clearOrder() {
    localStorage.removeItem(this.storageKey);
  }

  getOrder() {
    const savedOrder = localStorage.getItem(this.storageKey);
    const orderJson = JSON.parse(savedOrder as string).order;
    if (orderJson) return orderJson;
  }
}
