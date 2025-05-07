import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

type User = {
  name: string;
  document: string;
  email: string;
  phone: string;
};

enum Currencys {
  dollar = 'dollar',
  euro = 'euro',
  libra = 'libra',
}

type Currency = keyof typeof Currencys;

export type Data = {
  dollar: CurrencyData;
  euro: CurrencyData;
  libra: CurrencyData;
  total: number;
  total_value: number;
  user: User;
};

export type CurrencyData = {
  bills: Bill[];
  total: number;
  total_value: number;
};

export type Bill = {
  currency_name?: string;
  value: number;
  qtd: number;
  total: number;
  total_value: number;
};

export type Order = {
  list: Bill[];
  user: User;
  total: number;
  total_value: number;
};

export const STORAGE_KEY = 'CASA_DE_CAMBIO';

@Component({
  selector: 'app-order',
  imports: [MatTabsModule, MatTableModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  constructor(public router: Router) {}

  loading: boolean = false;
  displayedColumns: string[] = ['value', 'qtd', 'total', 'total_value'];

  data: Data = {
    dollar: {
      bills: [
        {
          value: 5,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 10,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 20,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 50,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 100,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
      ],
      total: 0,
      total_value: 0,
    },
    euro: {
      bills: [
        {
          value: 5,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 10,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 20,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 50,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 100,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
      ],
      total: 0,
      total_value: 0,
    },
    libra: {
      bills: [
        {
          value: 5,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 10,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 20,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 50,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
        {
          value: 100,
          qtd: 0,
          total: 0,
          total_value: 0,
        },
      ],
      total: 0,
      total_value: 0,
    },
    total: 0,
    total_value: 0,
    user: {
      name: '',
      document: '',
      email: '',
      phone: '',
    },
  };

  currency = {
    value: 6.1,
    name: Currencys.dollar,
  };

  ngOnInit() {
    this.loading = true;
    this.getData();
  }

  getData() {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const dataJson = JSON.parse(savedData as string);
      if (dataJson?.data) {
        this.data = dataJson.data;
      }
    } catch (error) {
      alert('Ocorreu um erro ao carregar informações');
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  updateValue(event: Event, index: number) {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);

    this.data[this.currency.name].bills[index].qtd = value;
    this.data[this.currency.name].bills[index].total = Number(
      (value * this.data[this.currency.name].bills[index].value).toFixed(2)
    );
    this.data[this.currency.name].bills[index].total_value = Number(
      (value * this.currency.value).toFixed(2)
    );

    this.data[this.currency.name] = {
      ...this.data[this.currency.name],
      total: Number(
        this.data[this.currency.name].bills
          .reduce((prev: number, curr: Bill) => prev + curr.total, 0)
          .toFixed(2)
      ),
      total_value: Number(
        this.data[this.currency.name].bills
          .reduce((prev: number, curr: Bill) => prev + curr.total_value, 0)
          .toFixed(2)
      ),
    };

    this.data.total =
      this.data.dollar.total + this.data.euro.total + this.data.libra.total;

    this.data.total_value =
      this.data.dollar.total_value +
      this.data.euro.total_value +
      this.data.libra.total_value;
  }

  handleTabChange(value: any) {
    this.currency.name = value.tab.id;
  }

  submitOrder() {
    const order: Order = {
      list: [
        ...this.data.dollar.bills
          .filter((elem: Bill) => elem.qtd)
          .map((elem: Bill) => ({ ...elem, currency_name: 'Dólar' })),
        ...this.data.euro.bills
          .filter((elem: Bill) => elem.qtd)
          .map((elem: Bill) => ({ ...elem, currency_name: 'Euro' })),
        ...this.data.libra.bills
          .filter((elem: Bill) => elem.qtd)
          .map((elem: Bill) => ({ ...elem, currency_name: 'Libra' })),
      ],
      user: this.data.user,
      total: this.data.total,
      total_value: this.data.total_value,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        order: order,
        data: this.data,
      })
    );

    this.router.navigate(['/revisar-pedido']);
  }
}
